import DashboardLayout from "../components/dashboard/DashboardLayout";
import TopHeader from "../components/layout/TopHeader";
import Sidebar from "../components/layout/Sidebar";
import StatCard from "../components/dashboard/StatCard";
import MarketTrendsChart from "../components/marketInsights/MarketTrendsChart";
import PlayerCard from "../components/dashboard/PlayerCard";
import { Link as LINK } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // เก็บคำค้นหา
  const searchedPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const sortedPlayers = [...searchedPlayers].sort((a, b) => {
    return (b.stats?.potential || 0) - (a.stats?.potential || 0);
  });

  useEffect(() => {
    fetch("/dataplayer.json")
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error loading players:", error));
  }, []);

  return (
    <div>
      <DashboardLayout sidebar={<Sidebar />}>
        <TopHeader onSearch={(e) => setSearchTerm(e.target.value)} />
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          <StatCard title="Total Players" value="1,234" change={5.2} />
          <StatCard title="Total Market Value" value="1,234" change={5.2} />
          <StatCard title="Avg. Overall Rating" value="567" change={-2.1} />
          <StatCard title="Average Age" value="567" change={-2.1} />
          <StatCard title="Total Goals (2025)" value="$987.6M" change={10.5} />
          <StatCard title="Represented Clubs" value="$987.6M" change={10.5} />
        </div>
        <div className="mt-4 justify-start">
          <MarketTrendsChart />
        </div>
        <div className="m-10 mt-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-gray-950">
              Hidden Gems
            </h2>
            <LINK
              to="/prospects"
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              View All Prospects →
            </LINK>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedPlayers.slice(0, 4).map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
          {/* ถ้าหาไม่เจอ ให้โชว์ข้อความบอกผู้ใช้ */}
          {sortedPlayers.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No players found matching "{searchTerm}"
            </p>
          )}
        </div>
      </DashboardLayout>
    </div>
  );
}
