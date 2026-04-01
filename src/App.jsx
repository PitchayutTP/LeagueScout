import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Prospects from "./pages/Prospects";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Prospects" element={<Prospects />} />
      </Routes>
  );
}

export default App;
