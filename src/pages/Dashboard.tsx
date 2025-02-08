import { useState } from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import Form from "../components/Form";
import StockholdersTable from "../components/Table";
import PieChartComponent from "../components/PieChartComponent";

interface Stockholder {
  firstName: string;
  lastName: string;
  participation: number;
}

export default function Dashboard() {
  const [data, setData] = useState<Stockholder[]>([]);

  const handleAddStockholder = (newStockholder: Stockholder) => {
    setData([...data, newStockholder]);
  };

  return (
    <Container>
      <Box sx={{ width: "100%", backgroundColor: "primary.main", color: "white", p: 3, textAlign: "center" }}>
        <Form onSubmit={handleAddStockholder} />
      </Box>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4">DATA</Typography>
        <Typography variant="body1" color="textSecondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <StockholdersTable data={data} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PieChartComponent data={data} />
        </Grid>
      </Grid>
    </Container>
  );
}
