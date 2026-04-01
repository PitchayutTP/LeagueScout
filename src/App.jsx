import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Prospects from "./pages/Prospects";
import DiscoveryDashboard from "./pages/DiscoveryDashboard";
import PlayerDetails from "./pages/PlayerDetails";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Prospects" element={<Prospects />} />
        <Route path="/player-search" element={<DiscoveryDashboard />} />
        <Route path="/players/:id" element={<PlayerDetails />} />
      </Routes>
      
  );
}

export default App;
