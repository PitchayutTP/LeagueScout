import React from 'react';
import { Target, TrendingUp, BarChart3, Star } from 'lucide-react';

// เราจะรับ prop เป็น object ชื่อ 'player' ที่มีข้อมูลครบ
const PlayerCard = ({ player }) => {
  // ฟังก์ชันช่วยคำนวณสีของหลอด Potential ตามคะแนน
  const getPotentialColor = (score) => {
    if (score >= 90) return 'bg-emerald-500'; // ยอดเยี่ยม
    if (score >= 80) return 'bg-sky-500';     // ดี
    if (score >= 70) return 'bg-amber-500';  // ปานกลาง
    return 'bg-rose-500';                    // ต้องพัฒนา
  };

  const potentialColor = getPotentialColor(player.potential);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden">
      
      {/* --- ส่วนบน: รูปนักเตะและโลโก้ --- */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {/* รูปนักเตะ - ใช้ object-cover เพื่อให้รูปพอดีกรอบ */}
        <img 
          src={player.imageUrl || '/images/default-player.jpg'} 
          alt={player.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* ป้ายชื่อลีก (Badge) มุมขวาบน */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">
            {player.league}
          </p>
        </div>

        {/* โลโก้สโมสร (Overlay) ด้านล่างซ้าย */}
      </div>

      {/* --- ส่วนกลาง: ข้อมูลพื้นฐาน --- */}
      <div className="p-5 pt-7">
        <h3 className="text-lg font-extrabold text-gray-950 truncate group-hover:text-blue-700 transition-colors">
          {player.name}
        </h3>
        <p className="text-xs font-medium text-gray-500 mb-4 tracking-wide">
          {player.age} Years • {player.position}
        </p>
        
        {/* เส้นคั่นจางๆ */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* ข้อมูลสถิติหลัก (Market Value & Potential) */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Market Value */}
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Market Value</p>
              <p className="text-base font-bold text-gray-950">${player.marketValue}</p>
            </div>
          </div>

          {/* Potential Score */}
          <div className="flex items-center gap-2.5 justify-end">
            <div className="p-2 bg-sky-50 rounded-lg text-sky-600">
              <Star className="h-4 w-4 fill-sky-600/20" />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Potential</p>
              <p className="text-base font-bold text-gray-950">{player.potential} <span className="text-gray-300">/ 100</span></p>
            </div>
          </div>

        </div>

        {/* --- ส่วนล่าง: หลอดพลัง Potential (Progress Bar) --- */}
        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-gray-600 flex items-center gap-1.5">
              <BarChart3 className="h-3.5 w-3.5 text-gray-400" />
              Growth Potential
            </span>
            <span className={`${potentialColor.replace('bg-', 'text-')}`}>
              {player.potential}%
            </span>
          </div>
          
          {/* ตัวหลอดพลัง */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
            {/* ปรับความกว้าง (width) ตามเปอร์เซ็นต์จริง */}
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-out ${potentialColor}`} 
              style={{ width: `${player.potential}%` }}
            ></div>
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default PlayerCard;