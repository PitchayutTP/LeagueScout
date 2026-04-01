import React from 'react';
// Import คอมโพเนนต์ต่างๆ จากโฟลเดอร์ components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DiscoveryDashboard from '../pages/DiscoveryDashboard';
import './App.css' // <-- Import CSS ตรงนี้ที่เดียวจบ


function App() {
  return (
    <div className="flex min-h-screen font-sans bg-slate-50">
      {/* 1. วาง Sidebar ไว้ซ้ายสุด */}
      <Sidebar />

      {/* 2. พื้นที่ด้านขวาเว้นระยะห่างเท่าขนาด Sidebar (ml-64) */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* แถบเมนูด้านบน */}
        <Navbar />
        {/* เนื้อหาหลักที่มีตัวกรองและการ์ดผู้เล่น */}
        <DiscoveryDashboard />
      </div>
    </div>
  );
}

export default App;