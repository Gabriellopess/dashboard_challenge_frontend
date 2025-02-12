import { useState, useEffect } from "react";
import { Container, Typography, Box, Grid, Paper, FormControl, InputLabel, Select, MenuItem  } from "@mui/material";
import OwnershipFormComponent from "../components/OwnershipFormComponent";
import DashboardTable from "../components/DashboardTableComponent";
import Swal from "sweetalert2";
import axios from "axios";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

interface Stockholder {
  id: number;
  name: string;
  holdings_dict: { [key: string]: number };
}

interface Enterprise {
  id: number;
  name: string;
  stockholders_dict: { [key: string]: number };
  percentage_sold: number;
}

interface Ownership {
  id: number;
  stockholder: number;
  stockholder_name: string;
  enterprise: number;
  enterprise_name: string;
  percentage: number;
}

export default function Dashboard() {
  const [stockholders, setStockholders] = useState<Stockholder[]>([]);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [ownerships, setOwnerships] = useState<Ownership[]>([]);
  const [selectedStockholder, setSelectedStockholder] = useState<Stockholder | null>(null);
  const [selectedEnterprise, setSelectedEnterprise] = useState<Enterprise | null>(null);

  const filteredOwnerships = ownerships.filter((o) => selectedStockholder?.id === o.stockholder);
  const stockholderHoldings = selectedStockholder?.holdings_dict || {};
  const pieChartData = Object.entries(stockholderHoldings).map(([enterprise, percentage]) => ({
    id: enterprise,
    value: percentage,
    label: enterprise,
  }));

  const filteredOwnershipsEnterprise = ownerships.filter((o) => selectedEnterprise?.id === o.enterprise);
  const enterpriseHoldings = selectedEnterprise?.stockholders_dict || {};
  const pieChartDataEnterprise = Object.entries(enterpriseHoldings).map(([stockholder, percentage]) => ({
    id: stockholder,
    value: percentage,
    label: stockholder,
  }));

  useEffect(() => {
    axios.get("https://oncase-dashboard-50794a3b8eb0.herokuapp.com/holding/stockholders/").then((res) => setStockholders(res.data));
    axios.get("https://oncase-dashboard-50794a3b8eb0.herokuapp.com/client/enterprises/").then((res) => setEnterprises(res.data));
    axios.get("https://oncase-dashboard-50794a3b8eb0.herokuapp.com/holding/ownerships/").then((res) => setOwnerships(res.data));
  }, []);


  const handleAddOwnership = (newOwnership: { stockholder: number; enterprise: number; percentage: number }) => {
    axios.post("https://oncase-dashboard-50794a3b8eb0.herokuapp.com/holding/ownerships/", {
      stockholder: newOwnership.stockholder,
      enterprise: newOwnership.enterprise,
      percentage: newOwnership.percentage,
    })
      .then((response) => {
        setOwnerships([...ownerships, response.data]);

        Swal.fire({
          icon: "success",
          title: "Ownership Added!",
          text: "The ownership transaction was successfully recorded.",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((error) => console.error("Error posting ownership:", error));
  };

const enterprisesNames = ownerships.map((o) => o.enterprise_name).filter((value, index, self) => self.indexOf(value) === index);
const enterprisesPercentages: { [key: string]: number } = {};

ownerships.forEach((o) => {
  if (!enterprisesPercentages[o.enterprise_name]) {
    enterprisesPercentages[o.enterprise_name] = Number(o.percentage);
  }
  else
    enterprisesPercentages[o.enterprise_name] += Number(o.percentage);
});

const percentageSeries = Object.keys(enterprisesPercentages).map((name) => (enterprisesPercentages[name]));

  return (
    <Container>
      {/* Ownership Form Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>Register Ownership</Typography>
        <OwnershipFormComponent stockholders={stockholders} enterprises={enterprises} onSubmit={handleAddOwnership} />
      </Paper>

      {/* Recent Ownerships Table */}
      <Box sx={{ textAlign: "center", mt: 4, mb: 2 }}>
        <Typography variant="h4">Recent Ownerships</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, backgroundColor: "background.default", width: "100%" }}>
              <DashboardTable
                columns={["Stockholder", "Enterprise", "Percentage"]}
                data={ownerships.map((o) => ({
                  id: o.id,
                  stockholder: o.stockholder,
                  stockholder_name: o.stockholder_name,
                  enterprise: o.enterprise,
                  enterprise_name: o.enterprise_name,
                  percentage: o.percentage,
                }))}
              />
            </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box sx={{ ml: 3, width: '100%', overflow: 'auto' }}>
                <BarChart
                yAxis={[{ label: 'Participation (%)' }]}
                xAxis={[{ label: 'Enterprises', scaleType: 'band', data: enterprisesNames }]}
                series={[{ data: percentageSeries }]}
                width={500}
                height={300}
                />
              </Box>
            </Paper>
        </Grid>
      </Grid>


      {/* Stockholder Stats */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h4">Stockholder Stats</Typography>
      </Box>

      {/* Stockholder Selection */}
      <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
      <FormControl sx={{ mt: 2, minWidth: 400 }}>
        <InputLabel>Select Stockholder</InputLabel>
        <Select value={selectedStockholder?.id || ''} onChange={(e) => {
          const stockholder = stockholders.find(s => s.id === Number(e.target.value)) || null;
          setSelectedStockholder(stockholder);
        }}>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {stockholders.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedStockholder && (
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <DashboardTable 
              columns={["Name", "Enterprise", "Percentage"]} 
              data={filteredOwnerships.map(o => ({
                id: o.id,
                stockholder: o.stockholder,
                stockholder_name: o.stockholder_name,
                enterprise: o.enterprise,
                enterprise_name: o.enterprise_name,
                percentage: o.percentage,
              }))}
            />
          </Grid>
          <Grid item xs={12} md={6} minHeight={300}>
            <PieChart
              series={[
                {
                  data: pieChartData,
                  innerRadius: 30,
                  outerRadius: 90,
                  paddingAngle: 3,
                  cornerRadius: 5,
                  startAngle: -45,
                  endAngle: 360,
                  cx: 160,
                  cy: 125,
                }
              ]}
            />
          </Grid>
        </Grid>
      )}
      </Paper>

      {/* Enterprise Stats */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h4">Enterprise Stats</Typography>
      </Box>

      {/* Enterprise Selection */}
      <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
        <FormControl sx={{ mt: 2, minWidth: 400 }}>
          <InputLabel>Select Enterprise</InputLabel>
          <Select value={selectedEnterprise?.id || ''} onChange={(e) => {
            const enterprise = enterprises.find(s => s.id === Number(e.target.value)) || null;
            setSelectedEnterprise(enterprise);
          }}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {enterprises.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedEnterprise && (
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={12}>
            <DashboardTable 
              columns={["Stockholder", "Enterprise", "Percentage"]} 
              data={filteredOwnershipsEnterprise.map(o => ({
                id: o.id,
                stockholder: o.stockholder,
                stockholder_name: o.stockholder_name,
                enterprise: o.enterprise,
                enterprise_name: o.enterprise_name,
                percentage: o.percentage,
              }))}
            />
          </Grid>
          
          <Grid item xs={12} md={6} minHeight={300} sx={{mt: 1}}>
            <PieChart 
              series={[
                {
                  data: pieChartDataEnterprise,
                  innerRadius: 30,
                  outerRadius: 90,
                  paddingAngle: 3,
                  cornerRadius: 5,
                  startAngle: -45,
                  endAngle: 360,
                  cx: 160,
                  cy: 125,
                }
              ]}
              sx={{ pl: 3 }}
            />
          </Grid>

          <Grid item xs={12} md={6} minHeight={300} sx={{mt: 3}}>
            <Box position="relative" display="inline-flex">
              <Gauge
                valueMax={100}
                width={250}
                height={250}
                value={selectedEnterprise.percentage_sold}
                cornerRadius="50%"
                sx={{
                  [`& .${gaugeClasses.valueText}`]: { fontSize: 30 },
                  [`& .${gaugeClasses.valueArc}`]: { fill: 'primary.main' },
                  pl: 6,
                  ml: 6,
                }}
              />

              {/* Overlay Label */}
              <Box
                position="absolute"
                top="0%"
                left="37%"
                sx={{
                  transform: "translate(0%, 0%)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" fontWeight="light">
                  Percentage Sold
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        )}
      </Paper>
    </Container>
  );
}
