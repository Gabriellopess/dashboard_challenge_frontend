import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface Stockholder {
  firstName: string;
  lastName: string;
  participation: number;
}

interface Props {
  data: Stockholder[];
}

export default function StockholdersTable({ data }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Participation (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((p, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{p.firstName}</TableCell>
              <TableCell>{p.lastName}</TableCell>
              <TableCell>{p.participation}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
