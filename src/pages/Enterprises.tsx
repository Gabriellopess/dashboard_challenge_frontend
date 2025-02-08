import { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import { red } from "@mui/material/colors";

interface Enterprise {
  id: number;
  name: string;
  valuation: number;
  percentage_sold: number;
  founded_date: string;
}

export default function Enterprises() {
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedEnterprise, setSelectedEnterprise] = useState<Enterprise | null>(null);
  const [newEnterprise, setNewEnterprise] = useState({ name: "", valuation: "", percentage_sold: "", founded_date: "" });

  // Fetch enterprises
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/client/enterprises/")
      .then(response => setEnterprises(response.data))
      .catch(error => console.error("Error fetching enterprises:", error));
    console.log(enterprises);
  }, []);

  // Open modals
  const handleEdit = (enterprise: Enterprise) => { setSelectedEnterprise(enterprise); setOpenEdit(true); };
  const handleDelete = (enterprise: Enterprise) => { setSelectedEnterprise(enterprise); setOpenDelete(true); };
  const handleCreate = () => { setOpenCreate(true); };

  // Close modals
  const handleClose = () => { setOpenEdit(false); setOpenDelete(false); setOpenCreate(false); setSelectedEnterprise(null); };

  // Handle edit submission
  const handleEditSubmit = () => {
    if (!selectedEnterprise) return;
    axios.put(`http://127.0.0.1:8000/client/enterprises/${selectedEnterprise.id}/`, selectedEnterprise)
      .then(() => {
        setEnterprises(enterprises.map(e => e.id === selectedEnterprise.id ? selectedEnterprise : e));
        handleClose();
      })
      .catch(error => console.error("Error updating enterprise:", error));
  };

  // Handle delete submission
  const handleDeleteSubmit = () => {
    if (!selectedEnterprise) return;
    axios.delete(`http://127.0.0.1:8000/client/enterprises/${selectedEnterprise.id}/`)
      .then(() => {
        setEnterprises(enterprises.filter(e => e.id !== selectedEnterprise.id));
        handleClose();
      })
      .catch(error => console.error("Error deleting enterprise:", error));
  };

  // Handle create submission
  const handleCreateSubmit = () => {
    axios.post("http://127.0.0.1:8000/client/enterprises/", newEnterprise)
      .then(response => {
        setEnterprises([...enterprises, response.data]);
        handleClose();
      })
      .catch(error => console.error("Error creating enterprise:", error));
  };

  console.log(enterprises);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>Enterprises</Typography>

    <TableContainer component={Paper}> 
      <Table>
        <TableHead sx={{ backgroundColor: "primary.main", textAlign: "center"}}>
        <TableRow>
          <TableCell sx={{textAlign: "center", fontWeight: "bold"}}>Name</TableCell>
          <TableCell sx={{textAlign: "center", fontWeight: "bold"}}>Valuation</TableCell>
          <TableCell sx={{textAlign: "center", fontWeight: "bold"}}>Percentage Sold</TableCell>
          <TableCell sx={{textAlign: "center", fontWeight: "bold"}}>Founded Date</TableCell>
          <TableCell sx={{textAlign: "center", fontWeight: "bold"}}>Actions</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {enterprises.map((enterprise) => (
          <TableRow key={enterprise.id}>
            <TableCell sx={{textAlign: "center"}}>{enterprise.name}</TableCell>
            <TableCell sx={{textAlign: "center"}}>${enterprise.valuation}</TableCell>
            <TableCell sx={{textAlign: "center"}}>{enterprise.percentage_sold}%</TableCell>
            <TableCell sx={{textAlign: "center"}}>{enterprise.founded_date}</TableCell>
            <TableCell sx={{textAlign: "center"}}>
            <Button onClick={() => handleEdit(enterprise)} color="primary" sx={{borderRadius: 2}}>
              <EditIcon />
            </Button>
            <Button onClick={() => handleDelete(enterprise)} color="error" sx={{borderRadius: 2}}>
              <RemoveCircleIcon sx={{ color: red[800] }} />
            </Button>
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleCreate}>Create Enterprise</Button>

      {/* Edit Modal */}
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Edit Enterprise</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={selectedEnterprise?.name || ""} onChange={(e) => setSelectedEnterprise({ ...selectedEnterprise!, name: e.target.value })} />
          <TextField label="Valuation" fullWidth margin="dense" type="number" value={selectedEnterprise?.valuation || ""} onChange={(e) => setSelectedEnterprise({ ...selectedEnterprise!, valuation: Number(e.target.value) })} />
          <TextField label="Percentage Sold" fullWidth margin="dense" type="number" value={selectedEnterprise?.percentage_sold || ""} onChange={(e) => setSelectedEnterprise({ ...selectedEnterprise!, percentage_sold: Number(e.target.value) })} />
          <TextField label="Founded Date" fullWidth margin="dense" type="date" value={selectedEnterprise?.founded_date || ""} onChange={(e) => setSelectedEnterprise({ ...selectedEnterprise!, founded_date: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Delete Enterprise</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{selectedEnterprise?.name}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteSubmit} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Create Modal */}
      <Dialog open={openCreate} onClose={handleClose}>
        <DialogTitle>Create Enterprise</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={newEnterprise.name} onChange={(e) => setNewEnterprise({ ...newEnterprise, name: e.target.value })} />
          <TextField label="Valuation" fullWidth margin="dense" type="number" value={newEnterprise.valuation} onChange={(e) => setNewEnterprise({ ...newEnterprise, valuation: e.target.value })} />
          <TextField label="Percentage Sold" fullWidth margin="dense" type="number" value={newEnterprise.percentage_sold} onChange={(e) => setNewEnterprise({ ...newEnterprise, percentage_sold: e.target.value })} />
          <TextField label="Founded Date" fullWidth margin="dense" type="date" value={newEnterprise.founded_date} onChange={(e) => setNewEnterprise({ ...newEnterprise, founded_date: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateSubmit} color="primary">Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
