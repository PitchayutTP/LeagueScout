import DashboardLayout from "../components/dashboard/DashboardLayout";
import TopHeader from "../components/layout/TopHeader";
import Sidebar from "../components/layout/Sidebar";
import PlayerCard from "../components/dashboard/PlayerCard";
import React, { useState, useEffect } from "react";

export default function Prospects() {
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
        <div className="m-10 mt-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-950">All Prospects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
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
