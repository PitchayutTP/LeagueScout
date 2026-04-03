import React from 'react';
// เลือกใช้ Library ไอคอน เช่น lucide-react เพื่อความสวยงาม
import { Flag, Ruler, Footprints, Zap } from 'lucide-react'; 

// 1. Component ย่อยสำหรับช่องข้อมูล (Reusable)
const ProfileStatItem = ({ label, value, icon }) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-1.5 text-gray-400">
      {icon && <span className="text-gray-400">{icon}</span>}
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>
    </div>
    
    {/* แสดงผลค่าข้อมูลพื้นฐาน */}
    <p className="text-base font-extrabold text-gray-950">{value}</p>
  </div>
);

export default function PlayerHeaderCard ({ player }) {
  
  const getPlayerPhotoUrl = (playerId) => {
    if (!playerId) return '/images/default-player.jpg'; // กรณีไม่มี ID
    
    // แบบที่ 1: ดึงจากโฟลเดอร์ในโปรเจกต์ (Public Folder)
    return (player.imageUrl) ? player.imageUrl : `/images/players/${playerId}.jpg`; // ถ้ามี URL ในข้อมูลก็ใช้, ถ้าไม่มีก็ใช้ตาม ID

  };

  // ดึง URL ของรูปภาพและโลโก้มาเตรียมไว้
  const playerPhotoUrl = getPlayerPhotoUrl(player.id);

  return (
    <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm flex gap-10  transition-all duration-300 overflow-hidden group">
      
      {/* --- ส่วนซ้าย: รูปนักเตะ (ดึงตาม ID) --- */}
      <div className="w-64 h-72 rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
        <img 
          src={playerPhotoUrl} 
          alt={player.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* --- ส่วนขวา: ข้อมูลทั้งหมด --- */}
      <div className="flex-1 space-y-7 relative pt-20">
        
        {/* หัวข้อ (Status, Position, Club) */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            {/* ป้าย Elite Status */}
            <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full flex items-center gap-1.5 border border-blue-100">
              <Zap className="h-3.5 w-3.5 text-blue-600 fill-blue-600/20" />
              <p className="text-[10px] font-bold uppercase tracking-wider">
                {player.status}
              </p>
            </div>
            {/* ตำแหน่งและสโมสร */}
            <p className="text-sm font-semibold text-gray-500 tracking-wide">
              {player.position} - {player.team}
            </p>
          </div>
          
          {/* ชื่อนักเตะ (Kylian Mbappé) */}
          <h2 className="text-6xl font-extrabold text-gray-950 leading-tight">
            {player.name}
          </h2>
        </div>
        
        {/* เส้นคั่นจางๆ */}
        <div className="border-t border-gray-100"></div>

        {/* ตารางข้อมูลพื้นฐาน (4 รายการ) */}
        <div className="grid grid-cols-4 gap-6">
          <ProfileStatItem 
            label="Nationality" 
            value={player.nationality} 
          />
          <ProfileStatItem 
            label="Age" 
            value={`${player.age} Years`} // แสดงคำว่า Years ต่อท้าย
          />
          <ProfileStatItem 
            label="Height" 
            value={`${player.height} cm`} // แสดง cm ต่อท้าย
          />
          <ProfileStatItem 
            label="Preferred Foot" 
            value={player.preferredFoot} 
          />
        </div>
      </div>
      
    </div>
  );
};
