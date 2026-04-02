import React, { useState, useEffect } from "react";

export default function PerformanceDelta() {
  const [topPlayers, setTopPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/dataplayer.json")
      .then((res) => res.json())
      .then((data) => {
        // จัดอันดับเอา Top 3 มาเปรียบเทียบในตาราง
        const sortedPlayers = data
          .map(p => ({
            ...p,
            roiScore: p.marketValue > 0 ? (p.stats.overall / (p.marketValue / 100000)) : 0
          }))
          .sort((a, b) => b.roiScore - a.roiScore)
          .slice(0, 3);

        setTopPlayers(sortedPlayers);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || topPlayers.length < 3) {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 flex items-center justify-center min-h-75">
         <p className="text-gray-500 font-medium">Generating performance delta...</p>
      </div>
    );
  }

  // ผู้เล่น 3 คนแรกสำหรับแสดงผล
  const [p1, p2, p3] = topPlayers;

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Performance Delta</h2>
          <p className="text-xs text-gray-500">Direct metric comparison against database benchmarks</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl bg-white border border-gray-200">
        <table className="w-full text-left table-fixed">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-1/4">Metric Class</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-blue-600 w-1/4">
                <span className="flex items-center gap-2 truncate">
                  {p1.name} <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                </span>
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-1/4 truncate">{p2.name}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-1/4 truncate">{p3.name}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* ROW 1: Non-Penalty Goals (จำลองจากค่า Shooting) */}
            <tr className="hover:bg-blue-50/50 transition-colors group">
              <td className="px-6 py-5">
                <p className="text-sm font-bold text-gray-900">Non-Penalty Goals /90</p>
                <p className="text-[10px] text-gray-500">Finishing Efficiency</p>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-blue-600">{(p1.stats.shooting / 80).toFixed(2)}</span>
                </div>
              </td>
              <td className="px-6 py-5 text-sm font-medium text-gray-500">{(p2.stats.shooting / 80).toFixed(2)}</td>
              <td className="px-6 py-5 text-sm font-medium text-gray-500">{(p3.stats.shooting / 80).toFixed(2)}</td>
            </tr>

            {/* ROW 2: Progressive Carries (จำลองจากค่า Dribbling) */}
            <tr className="hover:bg-blue-50/50 transition-colors group">
              <td className="px-6 py-5">
                <p className="text-sm font-bold text-gray-900">Progressive Carries</p>
                <p className="text-[10px] text-gray-500">Vertical Advancement</p>
              </td>
              <td className="px-6 py-5 text-sm font-bold text-gray-900">{(p1.stats.dribbling / 12).toFixed(1)}</td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">{(p2.stats.dribbling / 12).toFixed(1)}</span>
                </div>
              </td>
              <td className="px-6 py-5 text-sm font-medium text-gray-500">{(p3.stats.dribbling / 12).toFixed(1)}</td>
            </tr>

            {/* ROW 3: SCA (จำลองจากค่า Passing) */}
            <tr className="hover:bg-blue-50/50 transition-colors group">
              <td className="px-6 py-5">
                <p className="text-sm font-bold text-gray-900">SCA (Shot Creating Actions)</p>
                <p className="text-[10px] text-gray-500">Creative Output</p>
              </td>
              <td className="px-6 py-5 text-sm font-bold text-gray-900">{(p1.stats.passing / 15).toFixed(2)}</td>
              <td className="px-6 py-5 text-sm font-medium text-gray-500">{(p2.stats.passing / 15).toFixed(2)}</td>
              <td className="px-6 py-5 text-sm font-medium text-gray-500">{(p3.stats.passing / 15).toFixed(2)}</td>
            </tr>

            {/* ROW 4: Aerial Success % (จำลองจากค่า Physical) */}
            <tr className="hover:bg-blue-50/50 transition-colors group">
              <td className="px-6 py-5">
                <p className="text-sm font-bold text-gray-900">Aerial Success %</p>
                <p className="text-[10px] text-gray-500">Physical Dominance</p>
              </td>
              <td className="px-6 py-5 text-sm font-medium text-gray-500">{p1.stats.physical}%</td>
              <td className="px-6 py-5 text-sm font-bold text-gray-900">{p2.stats.physical}%</td>
              <td className="px-6 py-5 text-sm font-medium text-gray-500">{p3.stats.physical}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}