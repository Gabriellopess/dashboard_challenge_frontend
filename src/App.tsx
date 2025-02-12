import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Stockholders from "./pages/Stockholders";
import Enterprises from "./pages/Enterprises";

export default function App() {
  return (
    <Router basename="/oncase_challenge_frontend">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="stockholders" element={<Stockholders />} />
          <Route path="enterprises" element={<Enterprises />} />
        </Route>
      </Routes>
    </Router>
  );
}
