import DashboardLayout from "../components/dashboard/DashboardLayout";
import TopHeader from "../components/layout/TopHeader";
import Sidebar from "../components/layout/Sidebar";
import StatCard from "../components/dashboard/StatCard";
import MarketTrendsChart from "../components/dashboard/MarketTrendsChart";
import PlayerCard from "../components/dashboard/PlayerCard";
import { Link as LINK } from "react-router-dom";

export default function Dashboard() {
  const hiddenGemsData = [
    {
      id: 101,
      name: "Mathis Leroy",
      age: 19,
      position: "Attacking Midfield",
      league: "LIGUE 2",
      value: "€2.4M",
      potential: 88,
      image: "/images/leroy.jpg", // ใส่ path รูปจริง
    },
    {
      id: 102,
      name: "Jesper de Jong",
      age: 21,
      position: "Central Defender",
      league: "EREDIVISIE",
      value: "€8.1M",
      potential: 85,
      image: "/images/dejong.jpg",
    },
    // ... เพิ่มนักเตะคนอื่นๆ ...
  ];

  return (
    <div>
      <DashboardLayout sidebar={<Sidebar />}>
        <TopHeader />
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          <StatCard title="Total Players" value="1,234" change={5.2} />
          <StatCard title="Total Players" value="1,234" change={5.2} />
          <StatCard title="Active Contracts" value="567" change={-2.1} />
          <StatCard title="Active Contracts" value="567" change={-2.1} />
          <StatCard title="Market Value" value="$987.6M" change={10.5} />
          <StatCard title="Market Value" value="$987.6M" change={10.5} />
        </div>
        <div className="mt-4 justify-start">
          <MarketTrendsChart />
        </div>
        <div className="m-10 mt-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-gray-950">
              Hidden Gems
            </h2>
            <LINK to="/prospects" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
              View All Prospects →
            </LINK>
          </div>

          {/* Grid จัดวางการ์ด: 1 คอลัมน์บนมือถือ, 2 บนแท็บเล็ต, 3-4 บนจอใหญ่ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hiddenGemsData.map((player) => (
              // ส่งข้อมูลนักเตะทั้งก้อนผ่าน prop ชื่อ 'player'
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
