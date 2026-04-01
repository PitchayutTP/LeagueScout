import React,{useState, useEffect} from "react";
import FilterPanel from "../components/FilterPanel";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PlayerCard from '../components/PlayerCard';
// import { mockPlayers } from '../data';
import { LayoutGrid, BarChart2 } from "lucide-react";

export default function DiscoveryDashboard() {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    fetch("/dataplayer.json")
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error loading players:", error));
  }, []);

  return (
    // Wrapper หลัก: เรียงจากซ้ายไปขวา (Sidebar + โซนขวา)
    <div className="flex min-h-screen font-sans bg-slate-50">
      {/* 1. เมนูด้านซ้ายสุด (ถูก Fixed ไว้) */}
      <Sidebar />

      {/* 2. โซนฝั่งขวาทั้งหมด (เว้นระยะห่างด้านซ้าย ml-64 ให้เท่ากับความกว้าง Sidebar) */}
      <div className="flex-1 flex flex-col ml-64">
        {/* 2.1 แถบเมนูด้านบน */}
        <Navbar />

        {/* 2.2 โซนเนื้อหาด้านล่าง Navbar (แบ่งเป็น FilterPanel กับ Main) */}
        <div className="flex flex-1 bg-slate-50/50">
          {/* ตัวกรองด้านซ้าย */}
          <FilterPanel />

          {/* เนื้อหาการ์ดด้านขวา */}
          <main className="flex-1 p-8 h-[calc(100vh-80px)] overflow-y-auto">
            {/* Header ของ Feed */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">
                  Discovery Feed
                </h1>
                <p className="text-slate-500 font-medium">
                  128 high-potential profiles identified matching your criteria.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold">
                  <BarChart2 size={16} /> RELEVANCE
                </button>
                <button className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                  <LayoutGrid size={20} />
                </button>
              </div>
            </div>

            {/* โซนแสดงการ์ดผู้เล่น (คอมเมนต์ไว้ตามต้นฉบับของคุณ) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {players.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}

              {/* Continue Scouting Card */}
              <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 border-dashed flex flex-col items-center justify-center text-center min-h-[360px]">
                <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center mb-4 text-slate-400">
                  <BarChart2 size={24} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Continue Scouting
                </h3>
                <p className="text-xs text-slate-500 font-medium px-4">
                  Scroll to view more analytical profiles
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
