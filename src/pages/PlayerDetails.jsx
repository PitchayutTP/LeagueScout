import DashboardLayout from "../components/dashboard/DashboardLayout";
import TopHeader from "../components/layout/TopHeader";
import Sidebar from "../components/layout/Sidebar";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayerHeaderCard from "../components/playerdetails/PlayerHeaderCard";
import PerformanceRadar from "../components/playerdetails/PerformanceRadar";
import SeasonProgression from "../components/playerdetails/Progression";
import Card from "../components/playerdetails/Card";

export default function PlayerDetails() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetch("/dataplayer.json")
      .then((response) => response.json())
      .then((data) => {
        const found = data.find((p) => String(p.id) === String(id));
        setPlayer(found);
      })
      .catch((error) => console.error("Error loading players:", error));
  }, [id]);

  if (!player) return <div className="p-10">Loading player data...</div>;

  return (
    <div>
      <DashboardLayout sidebar={<Sidebar />}>
        <TopHeader onSearch={(e) => setSearchTerm(e.target.value)} />
        <div className="m-10 mt-5">
            <PlayerHeaderCard player={player} />
        </div>
        <div className="flex">
        <div className="lg:col-span-1 p-10 pt-0 pr-3 w-[35%]">
        <Card marketValue={player.marketValue} contractEndDate={player.contractEndDate} />
      </div>
        <div className="lg:col-span-1 p-10 pt-0 w-[35%]">
        <PerformanceRadar playerStats={player.stats} />
      </div>
        <div className="lg:col-span-1 p-10 pt-0 pl-3 w-[35%]">
        <PerformanceRadar playerStats={player.stats} />
      </div>
      </div>
      <div className="lg:col-span-2 p-10 pt-0">
        <SeasonProgression historyData={player.history} />
      </div>
      </DashboardLayout>
    </div>
  );
}
