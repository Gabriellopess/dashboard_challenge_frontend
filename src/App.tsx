import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Stockholders from "./pages/Stockholders";
import Enterprises from "./pages/Enterprises";
// import Ownerships from "./pages/Ownerships";

export default function App() {
  return (
    <Router basename="/oncase_challenge_frontend">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="stockholders" element={<Stockholders />} />
          <Route path="enterprises" element={<Enterprises />} />
          {/* <Route path="ownerships" element={<Ownerships />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}





// import { useState } from "react";
// import { Container, Typography, Box, Grid2, Grid } from "@mui/material";
// import Form from "./components/Form";
// import StockholdersTable from "./components/Table";
// import PieChartComponent from "./components/PieChartComponent";

// interface Stockholder {
//   firstName: string;
//   lastName: string;
//   participation: number;
// }

// export default function App() {
//   const [data, setData] = useState<Stockholder[]>([]);

//   const handleAddStockholder = (newStockholder: Stockholder) => {
//     setData([...data, newStockholder]);
//   };

//   return (
//     <Container>
//       <Box sx={{ backgroundColor: "primary.main", color: "white", p: 3, textAlign: "center" }}>
//         <Form onSubmit={handleAddStockholder} />
//       </Box>

//       <Box sx={{ textAlign: "center", mt: 4 }}>
//         <Typography variant="h4">DATA</Typography>
//         <Typography variant="body1" color="textSecondary">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//         </Typography>
//       </Box>

//       <Grid2 container spacing={3} sx={{ mt: 4 }}>
//         <Grid item xs={12} md={6}>
//           <StockholdersTable data={data} />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <PieChartComponent data={data} />
//         </Grid>
//       </Grid2>
//     </Container>
//   );
// }



// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
