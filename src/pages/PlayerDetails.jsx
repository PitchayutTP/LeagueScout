import DashboardLayout from "../components/dashboard/DashboardLayout";
import TopHeader from "../components/layout/TopHeader";
import Sidebar from "../components/layout/Sidebar";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// ดึง Component กราฟนำมาใช้งาน
import PerformanceRadar from "../components/player-details/PerformanceRadar";
import SeasonProgression from "../components/player-details/Progression";

export default function PlayerDetails() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/dataplayer.json")
      .then((response) => response.json())
      .then((data) => {
        const found = data.find((p) => String(p.id) === String(id));
        setPlayer(found);
      })
      .catch((error) => console.error("Error loading players:", error));
  }, [id]);

  if (!player) return <div className="p-10 text-slate-500 font-medium">Loading player data...</div>;

  // ฟังก์ชันจัดฟอร์แมตราคา (เช่น 160.0 M)
  const formatPrice = (val) => {
    if (!val) return "N/A";
    if (val >= 1000000) return `€${(val / 1000000).toFixed(1)} M`;
    return `€${(val / 1000).toFixed(0)} K`;
  };

  // ฟังก์ชันดึงรูปธงชาติจาก FlagCDN โดยเทียบจากชื่อประเทศ
  const getFlagUrl = (nationality) => {
    const countryCodes = {
      "Thailand": "th",
      "Japan": "jp",
      "England": "gb-eng", // อังกฤษมีรหัสแยกเฉพาะ
      "South Korea": "kr",
      "France": "fr",
      "Netherlands": "nl",
      "Spain": "es",
      "Brazil": "br",
      "Norway": "no",
      "Sweden": "se",
      "Belgium": "be",
      "Italy": "it",
      "Portugal": "pt",
      "Uruguay": "uy",
      "Argentina": "ar",
      "Scotland": "gb-sct",
      "Denmark": "dk",
      "Germany": "de",
      "Ecuador": "ec"
    };
    
    const code = countryCodes[nationality];
    return code ? `https://flagcdn.com/w40/${code}.png` : null;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <DashboardLayout sidebar={<Sidebar />}>
        <TopHeader onSearch={(e) => setSearchTerm(e.target.value)} />

        <main className="p-8 space-y-8">
          
          {/* --- 1. Player Profile Section (ด้านบนสุด) --- */}
          <div className="flex flex-col lg:flex-row gap-8 items-end bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
            <div className="relative w-64 h-80 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
              <img 
                className="w-full h-full object-cover" 
                alt={player.name} 
                src={player.imageUrl || "https://ui-avatars.com/api/?name=Player&background=0D8ABC&color=fff"} 
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-sm">
                  Elite Status
                </span>
                <span className="text-slate-500 text-sm font-medium">
                  {player.position} · {player.team}
                </span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tighter text-slate-900">
                {player.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Nationality</p>
                  <p className="font-semibold text-lg flex items-center gap-2">
                    {player.nationality} 
                    {/* เรียกใช้รูปธงชาติ */}
                    {getFlagUrl(player.nationality) && (
                      <img 
                        src={getFlagUrl(player.nationality)} 
                        alt={`${player.nationality} flag`} 
                        className="h-4 rounded-sm shadow-sm object-cover"
                      />
                    )}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Age</p>
                  <p className="font-semibold text-lg">{player.age} Years</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Height</p>
                  <p className="font-semibold text-lg">{player.height} cm</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Preferred Foot</p>
                  <p className="font-semibold text-lg">{player.preferredFoot}</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- 2. Analytics Grid (แบ่งซ้าย 5 ส่วน / ขวา 7 ส่วน) --- */}
          <div className="grid grid-cols-12 gap-8">
            
            {/* ฝั่งซ้าย: Performance Radar */}
            <div className="col-span-12 lg:col-span-5 flex flex-col h-full">
              <PerformanceRadar playerStats={player.stats} />
            </div>

            {/* ฝั่งขวา: Market Valuation & Scout Insights */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
              
              {/* Valuation Card */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl flex justify-between items-center border border-slate-200 shadow-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Current Market Valuation</p>
                  <div className="flex items-baseline gap-4 mt-2">
                    <span className="text-4xl lg:text-5xl font-black text-slate-900">{formatPrice(player.marketValue)}</span>
                    <div className="flex items-center text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-md text-sm">
                      <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                      +4.2%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Contract Until</p>
                  <p className="text-lg font-bold text-slate-900">{player.contractEndDate}</p>
                </div>
              </div>

              {/* Scout Insights */}
              <div className="flex-1 bg-white border border-slate-200 shadow-sm rounded-2xl p-8 flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-slate-400">manage_search</span>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Scout Insights</h3>
                </div>
                
                <ul className="space-y-5 overflow-y-auto">
                  {player.scoutReports && player.scoutReports.map((report, idx) => {
                    const titles = ["Exceptional Explosive Power", "Technical Precision", "High-Intensity Load Management"];
                    return (
                      <li key={idx} className="flex items-start gap-4">
                        <span className={`material-symbols-outlined mt-1 ${idx === 2 ? 'text-slate-400' : 'text-emerald-500'}`}>
                          {idx === 2 ? 'info' : 'check_circle'}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900">{titles[idx] || "Key Observation"}</p>
                          <p className="text-sm text-slate-500 leading-relaxed mt-1">
                            {report}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

            </div>
          </div>

          {/* --- 3. Progression Chart Section --- */}
          <div>
            <SeasonProgression historyData={player.history} />
          </div>

          {/* Footer */}
          <footer className="py-8 flex justify-between items-center opacity-50">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Data Integrity Verified by LeagueScout</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">© 2026 Scouting Authority.</p>
          </footer>

        </main>
      </DashboardLayout>
    </div>
  );
}