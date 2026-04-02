import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export default function PerformanceRadar({ playerStats }) {
  if (!playerStats) return <div>No data available</div>;

  // 2. แปลงข้อมูลจาก { pace: 85, ... } ให้เป็น [ { subject: 'PACE', A: 85 }, ... ]
  const chartData = Object.entries(playerStats).slice(2, 8).map(([key, value]) => ({
    subject: key.toUpperCase(), // หัวข้อในกราฟ
    A: value, // ค่าพลัง (ต้องตรงกับ dataKey="A" ใน <Radar />)
    fullMark: 100, // ค่าพลังเต็ม
  }));

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest self-start mb-4">
        Performance Radar
      </h3>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#64748b", fontSize: 10, fontWeight: 700 }}
            />
            <Radar
              name="Player"
              dataKey="A" // ตรงกับค่าที่เรา map ไว้ข้างบน
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.15}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* ส่วนสรุปตัวเลขด้านล่างกราฟ */}
      <div className="grid grid-cols-2 gap-4 w-full mt-4">
        <div className="bg-blue-50 p-3 rounded-xl text-center">
          <p className="text-[10px] font-bold text-blue-400 uppercase">
            Overall
          </p>
          <p className="text-xl font-black text-blue-700">{playerStats.overall}</p>
        </div>
        <div className="bg-indigo-50 p-3 rounded-xl text-center">
          <p className="text-[10px] font-bold text-indigo-400 uppercase">
            Potential
          </p>
          <p className="text-xl font-black text-indigo-700">{playerStats.potential}</p>
        </div>
      </div>
    </div>
  );
}
