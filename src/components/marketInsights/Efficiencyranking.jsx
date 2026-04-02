import React, { useState, useEffect } from "react";

export default function EfficiencyRanking() {
  const [topPlayers, setTopPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/dataplayer.json")
      .then((res) => res.json())
      .then((data) => {
        // คำนวณหาค่าความคุ้มค่า (ROI) = ความสามารถ / ราคา
        const sortedPlayers = data
          .map(p => ({
            ...p,
            // จำกัดเพดานคะแนนสูงสุดไว้ที่ 9.9 (เพื่อไม่ให้คะแนนพุ่งทะลุ 10)
            roiScore: p.marketValue > 0 
              ? Math.min(9.9, (p.stats.overall / (p.marketValue / 4000000))).toFixed(1) 
              : "0.0"
          }))
          // เรียงจาก roiScore มากไปน้อย
          .sort((a, b) => parseFloat(b.roiScore) - parseFloat(a.roiScore))
          .slice(0, 3); // เอาแค่ 3 อันดับแรก

        setTopPlayers(sortedPlayers);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || topPlayers.length === 0) {
    return (
      <div className="col-span-4 bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-center min-h-100">
        <p className="text-gray-500 font-medium">Calculating efficiency...</p>
      </div>
    );
  }

  const bestPlayer = topPlayers[0];

  return (
    <div className="col-span-4 space-y-6">
      {/* Ranking List */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-6">Efficiency Ranking</h3>
        <div className="space-y-4">
          {topPlayers.map((player, index) => (
            <div key={player.id} className="flex items-center gap-4 bg-gray-50 border border-gray-100 p-3 rounded-xl">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                index === 0 ? "bg-blue-600 text-white shadow-md" : "bg-gray-200 text-gray-700"
              }`}>
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{player.name}</p>
                <p className="text-[10px] text-gray-500 truncate">{player.team}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${index === 0 ? "text-blue-600" : "text-gray-900"}`}>
                  {player.roiScore}
                </p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">ROI Score</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scout's Recommendation */}
      <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg shadow-blue-500/20">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-blue-200">verified</span>
          <h3 className="text-sm font-bold tracking-tight">Scout's Recommendation</h3>
        </div>
        <p className="text-sm leading-relaxed text-blue-50 font-medium">
          {bestPlayer.name} represents the highest conversion-to-price ratio currently available in the market. His profile matches elite "Moneyball" metrics for expected contributions vs wage expectations.
        </p>
      </div>
    </div>
  );
}