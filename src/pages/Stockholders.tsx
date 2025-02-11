import { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import TableComponent from "../components/TableComponent";
import ModalComponent from "../components/ModalComponent";
import axios from "axios";
import Swal from 'sweetalert2'
import type { Enterprise } from "./Enterprises";

interface Stockholder {
  id: number;
  name: string;
  email: string;
  holdings?: Enterprise[];
}

export default function Stockholders() {
  const [stockholders, setStockholders] = useState<Stockholder[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStockholder, setSelectedStockholder] = useState<Stockholder | null>(null);
  const [newStockholder, setNewStockholder] = useState<Stockholder>({ id: 0, name: "", email: "" });

  // Fetch stockholders
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/holding/stockholders/")
      .then(response => {
        const transformedData = response.data.map((stockholder: any) => ({
            ...stockholder,
            holdings: stockholder.holdings 
                ? Object.entries(stockholder.holdings).map(([name, percentage]) => ({ name, percentage }))
                : []
        }));
        setStockholders(transformedData);
        // setStockholders(response.data)
      })
      .catch(error => console.error("Error fetching stockholders:", error));
  }, []);

  // Handle modal open/close
  const handleOpen = (stockholder?: Stockholder) => {
    setSelectedStockholder(stockholder || null);
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);

  // Handle form changes
  const handleChange = (key: keyof Stockholder, value: any) => {
    if (selectedStockholder) {
      setSelectedStockholder({ ...selectedStockholder, [key]: value });
    } else {
      setNewStockholder({ ...newStockholder, [key]: value });
    }
  };

  // Handle create/update
  const handleSubmit = () => {
    if (selectedStockholder) {
      axios.put(`http://127.0.0.1:8000/holding/stockholders/${selectedStockholder.id}/`, selectedStockholder)
        .then(() => {
          setStockholders(stockholders.map(e => e.id === selectedStockholder.id ? selectedStockholder : e));
          handleClose();
        })
        .catch(error => console.error("Error updating stockholder:", error));
    } else {
      axios.post("http://127.0.0.1:8000/holding/stockholders/", newStockholder)
        .then(response => {
          setStockholders([...stockholders, response.data]);
          handleClose();
          setNewStockholder({ id: 0, name: "", email: "" });
        })
        .catch(error => console.error("Error creating stockholder:", error));
    }
  };

  // Handle delete
  const handleDelete = (stockholder: Stockholder) => {
    Swal.fire({
        title: `Delete ${stockholder.name} Stockholder?`,
        text: "You won't be able to revert this!",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Delete",
        confirmButtonColor: "#f44336",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "", "success");
          axios.delete(`http://127.0.0.1:8000/holding/stockholders/${stockholder.id}/`)
            .then(() => {
                setStockholders(stockholders.filter(e => e.id !== stockholder.id));
            })
            .catch(error => console.error("Error deleting stockholder:", error));
        }
    });
  };

  return (
    <Container>
      <Typography variant="h4">Stockholders</Typography>
      <TableComponent 
        columns={[
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
        ]}
        data={stockholders}
        onEdit={handleOpen}
        onDelete={handleDelete}
      />
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => handleOpen()}>Create Stockholder</Button>

      <ModalComponent
        open={openModal}
        title={selectedStockholder ? "Edit Stockholder" : "Create Stockholder"}
        fields={[
          { label: "Name", key: "name" },
          { label: "Email", key: "email"},
        ]}
        values={selectedStockholder || newStockholder}
        onChange={handleChange}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
