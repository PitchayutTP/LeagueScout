import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Sidebar from "../components/layout/Sidebar";
import AbilityMatrix from "../components/marketInsights/AbilityMatrix";
import EfficiencyRanking from "../components/marketInsights/Efficiencyranking";
import PerformanceDelta from "../components/marketInsights/Performancedelta";

export default function MarketInsights() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("/dataplayer.json")
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error loading players:", error));
  }, []);

  return (
    <DashboardLayout sidebar={<Sidebar />}>
      <div className="p-8 space-y-8 flex-1">
        {/* Top Section: Asymmetric Layout */}
        <div className="grid grid-cols-12 gap-8">
          <AbilityMatrix players={players} />
          <EfficiencyRanking players={players} />
        </div>

        {/* Bottom Section: Performance Delta Table */}
        <PerformanceDelta players={players} />
      </div>

    </DashboardLayout>
  );
}