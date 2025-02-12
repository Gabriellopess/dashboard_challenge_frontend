import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const drawerWidth = 5;

export default function Layout() {
  return (
    <Box sx={{ display: "flex", m: 1 }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={
      { 
        flexGrow: 1, 
        p: 3, 
        ml: `${drawerWidth}px`, 
        alignContent: "center", 
        backgroundColor: "white", 
        borderRadius: 2,
        boxShadow: 4,
        color: "black"
      }
      }>
        <Outlet />
      </Box>
    </Box>
  );
}