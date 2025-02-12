import { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import TableComponent from "../components/TableComponent";
import ModalComponent from "../components/ModalComponent";
import axios from "axios";
import Swal from 'sweetalert2'

export interface Enterprise {
  id: number;
  name: string;
  valuation: number;
  percentage_sold: number;
  founded_date: string;
}

export default function Enterprises() {
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEnterprise, setSelectedEnterprise] = useState<Enterprise | null>(null);
  const [newEnterprise, setNewEnterprise] = useState<Enterprise>({ id: 0, name: "", valuation: 0, percentage_sold: 0, founded_date: "" });

  useEffect(() => {
    axios.get("https://oncase-dashboard-50794a3b8eb0.herokuapp.com/client/enterprises/")
      .then(response => setEnterprises(response.data))
      .catch(error => console.error("Error fetching enterprises:", error));
  }, []);

  const handleOpen = (enterprise?: Enterprise) => {
    setSelectedEnterprise(enterprise || null);
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);

  const handleChange = (key: keyof Enterprise, value: any) => {
    if (selectedEnterprise) {
      setSelectedEnterprise({ ...selectedEnterprise, [key]: value });
    } else {
      setNewEnterprise({ ...newEnterprise, [key]: value });
    }
  };

  const handleSubmit = () => {
    if (selectedEnterprise) {
      axios.put(`https://oncase-dashboard-50794a3b8eb0.herokuapp.com/client/enterprises/${selectedEnterprise.id}/`, selectedEnterprise)
        .then(() => {
          setEnterprises(enterprises.map(e => e.id === selectedEnterprise.id ? selectedEnterprise : e));
          handleClose();
        })
        .catch(error => console.error("Error updating enterprise:", error));
    } else {
      axios.post("https://oncase-dashboard-50794a3b8eb0.herokuapp.com/client/enterprises/", newEnterprise)
        .then(response => {
          setEnterprises([...enterprises, response.data]);
          handleClose();
          setNewEnterprise({ id: 0, name: "", valuation: 0, percentage_sold: 0, founded_date: "" });
        })
        .catch(error => console.error("Error creating enterprise:", error));
    }
  };

  const handleDelete = (enterprise: Enterprise) => {
    Swal.fire({
        title: `Delete ${enterprise.name} Enterprise?`,
        text: "You won't be able to revert this!",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Delete",
        confirmButtonColor: "#f44336",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "", "success");
          axios.delete(`https://oncase-dashboard-50794a3b8eb0.herokuapp.com/client/enterprises/${enterprise.id}/`)
            .then(() => {
                setEnterprises(enterprises.filter(e => e.id !== enterprise.id));
            })
            .catch(error => console.error("Error deleting enterprise:", error));
        }
    });
  };

  return (
    <Container>
      <Typography variant="h4">Enterprises</Typography>
      <TableComponent 
        columns={[
            { label: "Name", key: "name" },
            { label: "Valuation", key: "valuation" },
            { label: "Percentage Sold", key: "percentage_sold" },
            { label: "Founded Date", key: "founded_date" },
        ]}
        data={enterprises}
        onEdit={handleOpen}
        onDelete={handleDelete}
      />
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => handleOpen()}>Create Enterprise</Button>

      <ModalComponent
        open={openModal}
        title={selectedEnterprise ? "Edit Enterprise" : "Create Enterprise"}
        fields={[
          { label: "Name", key: "name" },
          { label: "Valuation", key: "valuation", type: "number" },
          { label: "Percentage Sold", key: "percentage_sold", type: "number" },
          { label: "Founded Date", key: "founded_date", type: "date" },
        ]}
        values={selectedEnterprise || newEnterprise}
        onChange={handleChange}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}