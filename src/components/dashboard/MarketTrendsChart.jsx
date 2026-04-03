import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function MarketTrendsChart({ players }) {
  const [timeRange, setTimeRange] = useState('ALL');

  // --- คำนวณข้อมูลกราฟจาก JSON ---
const chartData = useMemo(() => {
    if (!players || players.length === 0) return [];

    const yearlyData = {};

    players.forEach(player => {
      if (player.history && Array.isArray(player.history)) {
        player.history.forEach(record => {
          const year = record.year;
          const goals = parseInt(record.goals) || 0; 

          if (year) {
            if (!yearlyData[year]) {
              yearlyData[year] = { totalGoals: 0, count: 0 };
            }
            yearlyData[year].totalGoals += goals;
            yearlyData[year].count += 1;
          }
        });
      }
    });

    // 2. แปลงเป็น Array แปลง str เป็น int และคำนวณค่าเฉลี่ย, แล้วเรียงตามปี
    let formattedData = Object.keys(yearlyData)
      .map(year => ({
        year: parseInt(year),
        value: parseFloat((yearlyData[year].totalGoals / yearlyData[year].count).toFixed(1))
      }))
      .sort((a, b) => a.year - b.year);

    // 3. กรองข้อมูลตาม timeRange (เพิ่มส่วนนี้เข้าไป)
    const currentYear = 2025; // อ้างอิงปีล่าสุดจาก JSON ของคุณ
    if (timeRange === '3Y') {
      formattedData = formattedData.filter(d => d.year > currentYear - 3);
    } else if (timeRange === '5Y') {
      formattedData = formattedData.filter(d => d.year > currentYear - 5);
    }

    return formattedData;
  }, [players, timeRange]);

  return (
    <div className="bg-white p-6 m-10 mt-0 rounded-xl border border-gray-200 shadow-sm h-96 flex flex-col">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Market Trends</h3>
          <p className="text-xs text-gray-500">Average player market value (€M) per year</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg">
          {['3Y', '5Y', 'ALL'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                timeRange === range ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full" style={{ minHeight: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94a3b8' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              tickFormatter={(value) => `€${value}M`} 
            />
            <Tooltip 
              formatter={(value) => [`€${value}M`, 'Avg. Market Value']}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}