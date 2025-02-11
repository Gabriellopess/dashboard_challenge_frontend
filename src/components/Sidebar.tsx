import { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
// import WorkIcon from "@mui/icons-material/Work";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import Collapse from '@mui/material/Collapse';
import { Link } from "react-router-dom";

const drawerWidth = 220;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Stockholders", icon: <PeopleIcon />, path: "/stockholders" },
  { text: "Enterprises", icon: <BusinessIcon />, path: "/enterprises" },
  // { text: "Ownerships", icon: <WorkIcon />, path: "/ownerships" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 60 : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: collapsed ? 60 : drawerWidth, transition: "width 0.3s", overflowX: "hidden" }
      }} 
    >
      <Toolbar sx={{ display: "flex", justifyContent: collapsed ? "space-between" : "end" }}>
        <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ ml: -2 }}>
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{ alignContent: "right" }} />}
        </IconButton>
      </Toolbar>
      <Divider />
        <List>
          {menuItems.map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={path} sx={{ "&:hover": { borderRadius: "18px" } }}>
                <ListItemIcon>{icon}</ListItemIcon>
                {!collapsed && <ListItemText primary={text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
    </Drawer>
  );
}



// import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import BusinessIcon from "@mui/icons-material/Business";
// import PeopleIcon from "@mui/icons-material/People";
// import WorkIcon from "@mui/icons-material/Work";
// import { Link } from "react-router-dom";

// const drawerWidth = 240;

// const menuItems = [
//   { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
//   { text: "Stockholders", icon: <PeopleIcon />, path: "/stockholders" },
//   { text: "Enterprises", icon: <BusinessIcon />, path: "/enterprises" },
//   { text: "Ownerships", icon: <WorkIcon />, path: "/ownerships" },
// ];

// export default function Sidebar() {
//   return (
//     <Drawer
//       sx={{ width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" } }}
//       variant="permanent"
//       anchor="left"
//     >
//       <Toolbar>
//         <img src="/logo.png" alt="Logo" style={{ width: "100%", padding: "10px" }} />
//       </Toolbar>
//       <Divider />
//       <List>
//         {menuItems.map(({ text, icon, path }) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton component={Link} to={path}>
//               <ListItemIcon>{icon}</ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// }