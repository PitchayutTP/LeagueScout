import React, { useState, useEffect } from "react";
import PlayerCard from "../components/discovery/PlayerCard";
import FilterPanel from "../components/discovery/FilterPanel"; // นำ FilterPanel กลับเข้ามา
import { LayoutGrid, BarChart2 } from "lucide-react";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import TopHeader from "../components/layout/TopHeader";
import Sidebar from "../components/layout/Sidebar";

export default function DiscoveryDashboard() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    fetch("/dataplayer.json")
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error loading players:", error));
  }, []);

  const searchedPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <DashboardLayout sidebar={<Sidebar />}>
        <TopHeader onSearch={(e) => setSearchTerm(e.target.value)} />
        
        {/* คอนเทนเนอร์แบ่ง 2 ฝั่ง (FilterPanel คู่กับ Main Content) */}
        <div className="flex flex-1 bg-slate-50/50 items-start">
          
          {/* ตัวกรองด้านซ้าย */}
          <FilterPanel />

          {/* โซนเนื้อหาหลักด้านขวา */}
          <main className="flex-1 p-8">
            
            {/* Header ของ Feed */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">
                  Discovery Feed
                </h1>
                <p className="text-slate-500 font-medium">
                  {searchedPlayers.length} high-potential profiles identified matching your criteria.
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

            {/* โซนแสดงการ์ดผู้เล่น */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchedPlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}

              {/* Continue Scouting Card (ซ่อนถ้าค้นหาแล้วไม่เจอนักเตะ) */}
              {searchedPlayers.length > 0 && (
                <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 border-dashed flex flex-col items-center justify-center text-center min-h-[300px]">
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
              )}
            </div>

            {/* กรณีที่ค้นหาแล้วไม่เจอใครเลย */}
            {searchedPlayers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-gray-500 text-lg">
                  No players found matching "{searchTerm}"
                </p>
              </div>
            )}

          </main>
        </div>
      </DashboardLayout>
    </div>
  );
}