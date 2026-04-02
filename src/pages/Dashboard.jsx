import DashboardLayout from "../components/dashboard/DashboardLayout";
import TopHeader from "../components/layout/TopHeader";
import Sidebar from "../components/layout/Sidebar";
import StatCard from "../components/dashboard/StatCard";
import MarketTrendsChart from "../components/dashboard/MarketTrendsChart";
import PlayerCard from "../components/dashboard/PlayerCard";
import { Link as LINK } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // เก็บคำค้นหา
  const searchedPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const sortedPlayers = [...searchedPlayers].sort((a, b) => {
    return (b.stats?.potential || 0) - (a.stats?.potential || 0);
  });

  useEffect(() => {
    fetch("/dataplayer.json")
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
        console.log("Loaded players:", data);
      })
      .catch((error) => console.error("Error loading players:", error));
  }, []);
  const stats = React.useMemo(() => {
    if (!players || players.length === 0)
      return {
        totalPlayers: 0,
        totalMarketValue: "0.00",
        avgOverall: "0.0",
        avgAge: "0.0",
        totalGoals2025: 0,
        goalsChange: 0,
        uniqueClubs: 0,
      };

    // --- การคำนวณค่าหลัก (2025) ---
    const totalPlayers = players.length;
    const totalValue = players.reduce((sum, p) => sum + p.marketValue, 0);
    const avgOverall =
      players.reduce((sum, p) => sum + p.stats.overall, 0) / totalPlayers;
    const avgAge = players.reduce((sum, p) => sum + p.age, 0) / totalPlayers;

    // คำนวณประตูรวม 2025 vs 2024
    const goals2025 = players.reduce((sum, p) => {
      return sum + (p.history.find((h) => h.year === 2025)?.goals || 0);
    }, 0);

    const goals2024 = players.reduce((sum, p) => {
      return sum + (p.history.find((h) => h.year === 2024)?.goals || 0);
    }, 0);

    // --- การคำนวณ % Change (สูตร: ((Current - Prev) / Prev) * 100) ---
    const calculateChange = (current, prev) => {
      if (!prev || prev === 0) return 0;
      return parseFloat((((current - prev) / prev) * 100).toFixed(1));
    };

    const goalsChange = calculateChange(goals2025, goals2024);
    console.log("Calculated stats:", {
      totalPlayers,
      totalMarketValue: (totalValue / 1_000_000_000).toFixed(2),
      avgOverall: avgOverall.toFixed(1),
      avgAge: avgAge.toFixed(1),
      totalGoals2025: goals2025,
      goalsChange,
      uniqueClubs: new Set(players.map((p) => p.team)).size,
    });
    return {
      totalPlayers,
      totalMarketValue: (totalValue / 1_000_000_000).toFixed(2), // หน่วย Billion
      avgOverall: avgOverall.toFixed(1),
      avgAge: avgAge.toFixed(1),
      totalGoals2025: goals2025,
      goalsChange: goalsChange, // ค่า Change จริงจากข้อมูล
      uniqueClubs: new Set(players.map((p) => p.team)).size,
    };
  }, [players]);

  return (
    <div>
      <DashboardLayout sidebar={<Sidebar />}>
        <TopHeader onSearch={(e) => setSearchTerm(e.target.value)} />
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          <StatCard
            title="Total Players"
            value={players.length}
            change={2.5} // หรือคำนวณจาก stats.playersChange
          />

          {/* 2. Market Value: ปกติมูลค่ามักจะขึ้น ถ้าใส่บวกจะดูดี */}
          <StatCard
            title="Total Market Value"
            value={`€${stats?.totalMarketValue}B`}
            change={5.2}
          />

          {/* 3. Rating: ถ้าค่า Overall เฉลี่ยลดลง ใส่ติดลบ (เช่น -1.2) เพื่อให้เป็นสีแดง */}
          <StatCard
            title="Avg. Overall Rating"
            value={stats?.avgOverall}
            change={-0.8}
          />

          {/* 4. Average Age: ถ้าตัวเลขน้อยลง (ทีมเด็กขึ้น) มักจะเป็นเรื่องดีในทางฟุตบอล */}
          <StatCard title="Average Age" value={stats?.avgAge} change={-2.1} />

          {/* 5. Total Goals: ใช้ค่าจริงที่คุณคำนวณไว้ */}
          <StatCard
            title="Total Goals (2025)"
            value={stats?.totalGoals2025}
            change={stats?.goalsChange}
          />

          {/* 6. Clubs: จำนวนสโมสรที่แมวมองไปดูมา */}
          <StatCard
            title="Represented Clubs"
            value={stats?.uniqueClubs}
            change={10.5}
          />
        </div>
        <div className="mt-4 justify-start">
          <MarketTrendsChart players={players} />
        </div>
        <div className="m-10 mt-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-gray-950">
              Hidden Gems
            </h2>
            <LINK
              to="/prospects"
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              View All Prospects →
            </LINK>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedPlayers.slice(0, 4).map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
          {/* ถ้าหาไม่เจอ ให้โชว์ข้อความบอกผู้ใช้ */}
          {sortedPlayers.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No players found matching "{searchTerm}"
            </p>
          )}
        </div>
      </DashboardLayout>
    </div>
  );
}
