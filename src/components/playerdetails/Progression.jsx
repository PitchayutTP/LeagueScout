import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function SeasonProgression({ historyData }) {
  if (!historyData || !Array.isArray(historyData)) return null;

  // แปลงข้อมูล year -> season เพื่อให้แสดงผลใน XAxis ได้
  const chartData = historyData.map((item) => ({
    ...item,
    season: item.year.toString(), // แปลง 2020 เป็น "2020"
  }));

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          9-Season Progression
        </h3>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="season"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 600, fill: "#94a3b8" }}
              dy={10}
            />
            <YAxis hide /> {/* ซ่อนแกน Y เพื่อความคลีนตามรูป */}
            {/* ตามเม้า */}
            <Tooltip
              cursor={{ fill: "#f8fafc" }}
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="square"
              iconSize={10}
            />
            {/* Bar สองสีซ้อนกัน (Stack) */}
            <Bar
              dataKey="goals"
              stackId="a"
              fill="#1d4ed8"
              radius={[0, 0, 0, 0]}
              barSize={50}
              name="Goals"
            />
            <Bar
              dataKey="assists"
              stackId="a"   
              fill="#bfdbfe"
              radius={[4, 4, 0, 0]}
              barSize={50}
              name="Assists"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
