import React, { useState, useEffect, useMemo } from "react";
import PlayerCard from "../components/discovery/PlayerCard";
import FilterPanel from "../components/discovery/FilterPanel";
import { LayoutGrid, BarChart2 } from "lucide-react";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import TopHeader from "../components/layout/TopHeader";
import Sidebar from "../components/layout/Sidebar";

export default function DiscoveryDashboard() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("none");

  // 1. เพิ่ม State สำหรับเก็บค่าจาก FilterPanel
  const [filters, setFilters] = useState({
    positions: [],
    league: "All",
    maxValue: 200000000,
    ageMin: 15,
    ageMax: 40,
  });

  useEffect(() => {
    fetch("/dataplayer.json")
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error loading players:", error));
  }, []);

  // 2. ใช้ useMemo ในการกรองข้อมูล (ผสมระหว่าง Search และ Tactical Filters)
const filteredPlayers = useMemo(() => {
    // ขั้นตอนที่ 1: Filter ข้อมูลก่อน
    let result = players.filter((player) => {
      const matchesSearch = player.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesPosition =
        filters.positions.length === 0 ||
        filters.positions.includes(player.position);

      const matchesLeague =
        filters.league === "All" || player.league === filters.league;

      const matchesValue = player.marketValue <= filters.maxValue;

      const matchesAge =
        player.age >= filters.ageMin && player.age <= filters.ageMax;

      return (
        matchesSearch &&
        matchesPosition &&
        matchesLeague &&
        matchesValue &&
        matchesAge
      );
    });

    // ขั้นตอนที่ 2: Sort ข้อมูล (ต้องอยู่นอก filter)
    if (sortBy === "overall_desc") {
      result = [...result].sort((a, b) => b.stats.overall - a.stats.overall);
    } else if (sortBy === "overall_asc") {
      result = [...result].sort((a, b) => a.stats.overall - b.stats.overall);
    }

    return result;
    
    // สำคัญ: ต้องใส่ sortBy ใน dependency list ด้วย ไม่งั้นเวลากดปุ่มแล้วค่าจะไม่เปลี่ยน
  }, [players, searchTerm, filters, sortBy]);

  const handleSortByOverall = () => {
    setSortBy((prev) =>
      prev === "overall_desc" ? "overall_asc" : "overall_desc",
    );
  };

  return (
    <div>
      <DashboardLayout sidebar={<Sidebar />}>
        <TopHeader onSearch={(e) => setSearchTerm(e.target.value)} />

        <div className="flex flex-1 ml-0 bg-slate-50/50 min-h-screen">
          {/* 3. ส่ง Props onFilterChange ไปให้ FilterPanel */}
          <FilterPanel
            onFilterChange={(newFilters) => setFilters(newFilters)}
            players={players}
          />

          <main className="flex-1 p-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">
                  Discovery Feed
                </h1>
                <p className="text-slate-500 font-medium">
                  {/* ใช้ filteredPlayers.length แทน */}
                  {filteredPlayers.length} high-potential profiles identified
                  matching your criteria.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button 
                onClick={handleSortByOverall}
                className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors hover:bg-blue-100">
                  <BarChart2 size={16} /> RELEVANCE
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* เปลี่ยนจาก searchedPlayers เป็น filteredPlayers */}
              {filteredPlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}

              {filteredPlayers.length > 0 && (
                <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 border-dashed flex flex-col items-center justify-center text-center min-h-75">
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

            {filteredPlayers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-gray-500 text-lg">
                  No players found matching your tactical criteria.
                </p>
              </div>
            )}
          </main>
        </div>
      </DashboardLayout>
    </div>
  );
}
