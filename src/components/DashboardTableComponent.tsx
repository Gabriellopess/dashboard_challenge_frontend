import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface Ownership {
  id: number;
  stockholder: number;
  stockholder_name: string;
  enterprise: number;
  enterprise_name: string;
  percentage: number;
}

interface Props {
  columns: string[];
  data: Ownership[];
}

export default function DashboardTable({ columns, data }: Props) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 320 }}>
      <Table stickyHeader >
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} sx={{ textAlign: "center", fontWeight: "bold", backgroundColor: "primary.main" }}>{column}</TableCell>
            ))}
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
          data.map((holding, index) => (
            <TableRow key={index}>
              <TableCell sx={{ textAlign: "center" }}>{holding.stockholder_name}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{holding.enterprise_name}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{holding.percentage}%</TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
