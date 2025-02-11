import { useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

interface Stockholder {
  id: number;
  name: string;
}

interface Enterprise {
  id: number;
  name: string;
}

interface OwnershipFormProps {
  stockholders: Stockholder[];
  enterprises: Enterprise[];
  onSubmit: (ownership: { stockholder: number; enterprise: number; percentage: number }) => void;
}

export default function OwnershipForm({ stockholders, enterprises, onSubmit }: OwnershipFormProps) {
  const [formData, setFormData] = useState({ stockholder: "", enterprise: "", percentage: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      stockholder: Number(formData.stockholder),
      enterprise: Number(formData.enterprise),
      percentage: Number(formData.percentage),
    });
    setFormData({ stockholder: "", enterprise: "", percentage: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: "flex", flexDirection: "row", gap: 2 }}>
      <TextField select label="Stockholder" name="stockholder" value={formData.stockholder} onChange={handleChange} fullWidth>
        {stockholders.map((s) => (
          <MenuItem key={s.id} value={s.id}>
            {s.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField select label="Enterprise" name="enterprise" value={formData.enterprise} onChange={handleChange} fullWidth>
        {enterprises.map((e) => (
          <MenuItem key={e.id} value={e.id}>
            {e.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField label="Percentage" type="number" name="percentage" value={formData.percentage} onChange={handleChange} fullWidth />

      <Button variant="contained" type="submit">Add</Button>
    </Box>
  );
}
