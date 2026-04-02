import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Sidebar from "../components/layout/Sidebar";
import AbilityMatrix from "../components/dashboard/AbilityMatrix";
import EfficiencyRanking from "../components/dashboard/Efficiencyranking";
import PerformanceDelta from "../components/dashboard/Performancedelta";

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

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="scout-gradient text-on-primary w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-2xl">compare_arrows</span>
        </button>
      </div>
    </DashboardLayout>
  );
}