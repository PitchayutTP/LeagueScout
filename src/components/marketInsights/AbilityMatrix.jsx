import React, { useState, useEffect } from "react";

export default function AbilityMatrix({ players }) {
  const [targetPlayerId, setTargetPlayerId] = useState(null);

  useEffect(() => {
    if (players && players.length > 0 && !targetPlayerId) {
      const bestPlayer = [...players].sort((a, b) => {
        const roiA = a.stats.overall / (a.marketValue / 4000000);
        const roiB = b.stats.overall / (b.marketValue / 4000000);
        return roiB - roiA; 
      })[0];
      setTargetPlayerId(bestPlayer.id);
    }
  }, [players, targetPlayerId]);

  if (!players || players.length === 0) {
    return (
      <div className="col-span-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center justify-center min-h-125">
        <p className="text-gray-500 font-medium">Loading market data...</p>
      </div>
    );
  }

  const formatPrice = (value) => {
    if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
    return `€${value / 1000}K`;
  };

  // ฟังก์ชันคำนวณตำแหน่งแกน Y (Technical Ability / Overall)
  const getBottomPosition = (overall) => {
    const percent = ((overall - 75) / (95 - 75)) * 100;
    return `${Math.max(5, Math.min(95, percent))}%`;
  };

  // ฟังก์ชันคำนวณตำแหน่งแกน X (Market Value)
  const getLeftPosition = (price) => {
    const percent = (price / 200000000) * 100;
    return `${Math.max(5, Math.min(95, percent))}%`;
  };

  return (
    <div className="col-span-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-gray-900 text-xl font-bold tracking-tight">Ability vs. Price Matrix</h2>
          <p className="text-gray-500 text-sm">Identifying high-value outliers in the database</p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span> Market Data
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-800">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span> Target Zone
          </span>
        </div>
      </div>
      
      {/* Chart Canvas */}
      <div className="relative h-100 w-full border-l-2 border-b-2 border-gray-200 mb-4">
        
        {/* Average Lines */}
        <div className="absolute w-full h-px bg-gray-200 top-1/2"></div>
        <div className="absolute h-full w-px bg-gray-200 left-1/2"></div>
        
        {players.map((player) => {
          // ตรวจสอบว่าจุดนี้คือจุดที่ถูกคลิกเลือก (Target) อยู่หรือไม่
          const isTarget = player.id === targetPlayerId;
          const bottom = getBottomPosition(player.stats.overall);
          const left = getLeftPosition(player.marketValue);

          return (
            <div
              key={player.id}
              onClick={() => setTargetPlayerId(player.id)} // คลิกเพื่อเปลี่ยน Target
              className={`absolute rounded-full cursor-pointer group transition-all ${
                isTarget
                  ? "w-4 h-4 bg-blue-600 ring-4 ring-blue-100 z-20" 
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-125 z-0" 
              } hover:z-50`} // hover:z-50 เพื่อดึง tooltip ลอยขึ้นชั้นบนสุด
              style={{ bottom, left }}
            >
              {/* Tooltip Content */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-gray-800 text-white p-3 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50">
                <p className={`text-[10px] font-bold uppercase mb-1 ${isTarget ? "text-blue-300" : "text-gray-400"}`}>
                  {isTarget ? "Target" : "Market Data"}
                </p>
                <p className="text-sm font-bold truncate">{player.name}</p>
                <div className="mt-2 flex justify-between text-[10px] text-gray-300">
                  <span>Score: {player.stats.overall}</span>
                  <span>Price: {formatPrice(player.marketValue)}</span>
                </div>
                <div className="mt-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${isTarget ? "bg-blue-400" : "bg-gray-400"}`}
                    style={{ width: `${player.stats.overall}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Axis Labels */}
        <div className="absolute -left-12 top-1/2 -rotate-90 text-[10px] font-bold uppercase tracking-widest text-gray-500">Technical Ability</div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-gray-500">Market Value (€)</div>
      </div>
    </div>
  );
}