import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DiscoveryDashboard from './pages/DiscoveryDashboard';
import './App.css'

function App() {
  return (
    <div className="flex min-h-screen font-sans bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar />
        <DiscoveryDashboard />
      </div>
    </div>
  );
}

export default App;