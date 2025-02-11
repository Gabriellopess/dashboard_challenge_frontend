import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

interface ModalComponentProps<T> {
  open: boolean;
  title: string;
  fields: { label: string; key: keyof T; type?: string }[];
  values: T | null;
  onChange: (key: keyof T, value: any) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ModalComponent<T>({ open, title, fields, values, onChange, onClose, onSubmit }: ModalComponentProps<T>) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {fields.map((field) => (
          <TextField
            key={String(field.key)}
            label={field.label}
            fullWidth
            margin="dense"
            type={field.type || "text"}
            value={values ? String(values[field.key]) : ""}
            onChange={(e) => onChange(field.key, e.target.value)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={onSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
