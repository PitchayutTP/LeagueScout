import DashboardLayout from "../components/dashboard/DashboardLayout";
import Sidebar from "../components/layout/Sidebar";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PlayerDetails() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

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

  // คำนวณความสูงของกราฟ (Max Goals 30, Max Assists 20)
  const getBarHeight = (value, max) => {
    if (!value || value === 0) return "4px"; // อย่างน้อยให้เห็นขีดบางๆ
    const percent = (value / max) * 100;
    return `${Math.max(2, Math.min(100, percent))}%`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <DashboardLayout sidebar={<Sidebar />}>

        <main className="p-8 space-y-8">
          
          <div className="flex flex-col lg:flex-row gap-8 items-end bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
            <div className="relative w-64 h-80 shrink-0 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
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
                    <span className="w-5 h-3 bg-blue-600 inline-block rounded-sm shadow-sm"></span>
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

          <div className="grid grid-cols-12 gap-8">
            
            <div className="col-span-12 lg:col-span-5 bg-white border border-slate-200 shadow-sm p-8 rounded-xl flex flex-col items-center">
              <h3 className="w-full text-sm font-bold uppercase tracking-widest mb-8 text-slate-900">Performance Radar</h3>
              <div className="relative w-64 h-64 flex items-center justify-center">
                <div className="absolute inset-0 border-[0.5px] border-slate-200 rounded-full scale-100"></div>
                <div className="absolute inset-0 border-[0.5px] border-slate-200 rounded-full scale-[0.8]"></div>
                <div className="absolute inset-0 border-[0.5px] border-slate-200 rounded-full scale-[0.6]"></div>
                <div className="absolute inset-0 border-[0.5px] border-slate-200 rounded-full scale-[0.4]"></div>
                <div className="absolute inset-0 border-[0.5px] border-slate-200 rounded-full scale-[0.2]"></div>
                
                <div className="absolute w-[85%] h-[85%] bg-emerald-500/20 border-2 border-emerald-500" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}></div>
                
                <div className="absolute -top-6 text-[10px] font-bold uppercase tracking-tighter text-slate-700">Pace {player.stats?.pace || 0}</div>
                <div className="absolute -right-10 top-1/3 text-[10px] font-bold uppercase tracking-tighter text-slate-700">Shooting {player.stats?.shooting || 0}</div>
                <div className="absolute -right-6 bottom-0 text-[10px] font-bold uppercase tracking-tighter text-slate-700">Passing {player.stats?.passing || 0}</div>
                <div className="absolute -left-6 bottom-0 text-[10px] font-bold uppercase tracking-tighter text-slate-700">Dribbling {player.stats?.dribbling || 0}</div>
                <div className="absolute -left-10 top-1/3 text-[10px] font-bold uppercase tracking-tighter text-slate-700">Physical {player.stats?.physical || 0}</div>
              </div>

              <div className="mt-8 w-full grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Overall</p>
                  <p className="text-3xl font-black text-blue-600">{player.stats?.overall || 0}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Potential</p>
                  <p className="text-3xl font-black text-emerald-600">{player.stats?.potential || 0}</p>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
              
              {/* Valuation Card */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl flex justify-between items-center border border-slate-200 shadow-sm">
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
              <div className="flex-1 bg-white border border-slate-200 shadow-sm rounded-xl p-8 flex flex-col">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-slate-900">Scout Insights</h3>
                
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

          <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-xl">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Season Progression</h3>
              
              <div className="flex gap-6 text-xs font-bold uppercase">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                  <span className="text-slate-600">Goals</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-200 rounded-sm"></div>
                  <span className="text-slate-600">Assists</span>
                </div>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-4 px-4 border-b border-slate-200 pb-2">
              {player.history && player.history.map((season, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1 group h-full justify-end">

                  <div className="w-full max-w-[40px] flex flex-col items-center justify-end h-48">
                    <div 
                      className="w-full bg-blue-200 rounded-t-sm transition-all"
                      style={{ height: getBarHeight(season.assists, 20) }}
                    ></div>
                    <div 
                      className="w-full bg-blue-600 rounded-b-sm transition-all group-hover:brightness-110"
                      style={{ height: getBarHeight(season.goals, 30) }}
                    ></div>
                  </div>
                  <span className={`text-[10px] font-bold mt-2 ${index === player.history.length - 1 ? 'text-blue-600' : 'text-slate-500'}`}>
                    {season.year}
                  </span>
                </div>
              ))}
            </div>
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