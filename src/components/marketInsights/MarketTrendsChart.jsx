import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// ข้อมูลจำลอง (Mock Data)
const data = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 300 },
  { month: 'Mar', value: 600 },
  { month: 'Apr', value: 800 },
  { month: 'May ', value: 500 },
  { month: 'Jun', value: 900 },
  { month: 'Jul', value: 1100 },
];

export default function MarketTrendsChart() {
  const [timeRange, setTimeRange] = useState('6M');

  return (
    <div className="bg-white p-6 m-10 mt-0 rounded-xl border border-gray-200 shadow-sm h-90 flex flex-col">
      
      {/* --- ส่วนหัวของกราฟ (Header) --- */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Market Trends</h3>
          <p className="text-xs text-gray-500">Average player market value over time</p>
        </div>

        {/* ปุ่มเลือกช่วงเวลา (Time Filter) */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {['1M', '6M', '1Y', 'ALL'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                timeRange === range 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* --- ส่วนตัวกราฟ (Chart Body) --- */}
      <div className="flex-1 w-full">
        {/* ResponsiveContainer ช่วยให้กราฟยืดหยุ่นตามขนาดหน้าจอ */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {/* เส้นตาราง (จางๆ) */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            
            {/* แกน X และ Y */}
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94a3b8' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94a3b8' }} 
            />
            
            {/* กล่องข้อมูลเวลาเอาเมาส์ไปชี้ (Tooltip) */}
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />

            {/* ตัวเส้นกราฟและพื้นที่ระบายสี (Area) */}
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
};