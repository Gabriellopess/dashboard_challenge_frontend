import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import { red } from "@mui/material/colors";

interface TableComponentProps<T> {
    columns: { label: string; key: keyof T }[];
    data: T[];
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
}

export default function TableComponent<T extends { id: number }>({ columns, data, onEdit, onDelete }: TableComponentProps<T>) {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
            <TableHead sx={{ backgroundColor: "primary.main", textAlign: "center" }}>
                <TableRow>
                    {columns.map(({label}, index) => (
                    <TableCell key={index} sx={{ textAlign: "center", fontWeight: "bold" }}>{label}</TableCell>
                    ))}
                    <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={columns.length + 1} sx={{ textAlign: "center" }}>
                            No data found
                        </TableCell>
                    </TableRow>
                ) : (
                data.map((item) => (
                    <TableRow key={item.id}>
                        {columns.map(({key}, index) => (
                            <TableCell key={index} sx={{ textAlign: "center" }}>
                                {String(item[key])}
                            </TableCell>
                        ))}
                        <TableCell sx={{ textAlign: "center" }}>
                            <Button onClick={() => onEdit(item)} color="primary" sx={{ minWidth: "50px" ,borderRadius: 2}}>
                                <EditIcon />
                            </Button>
                            <Button onClick={() => onDelete(item)} color="error" sx={{minWidth: "50px", borderRadius: 2}}>
                                <RemoveCircleIcon sx={{ color: red[800] }} />
                            </Button>
                        </TableCell>
                    </TableRow>
                )))}
            </TableBody>
      </Table>
    </TableContainer>
  );
}