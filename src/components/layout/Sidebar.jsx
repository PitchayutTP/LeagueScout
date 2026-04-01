import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "DASHBOARD", icon: "/dashboard.png", path: "/" },
    { name: "PLAYER SEARCH", icon: "/search_player.png", path: "/player-search" },
    { name: "MARKET INSIGHTS", icon: "/chart.png", path: "/market-insights" },
  ];

  return (
    <div className="h-full flex flex-col justify-between bg-[#ECF1FF] border-r border-gray-200">
      <div className="px-5 py-10">
        <h1 className="text-xl font-bold">Scouting Authority</h1>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          ELITE ANALYTICAL LENS
        </p>

        <nav className="space-y-1 pt-3">
          {menuItems.map((item) => {
            return (
              <NavLink
                key={item.name}
                to={item.path}
                // isActive เป็นค่าที่ NavLink ส่งมาให้เช็คว่า URL ปัจจุบันตรงกับ path นี้ไหม
                className={({ isActive }) => `
                  group w-full flex items-center gap-3 px-3 py-2.5 mt-2 rounded-lg text-sm font-medium transition-all
                  ${isActive 
                    ? "bg-blue-100 text-blue-700 shadow-sm" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                `}
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={item.icon}
                      alt={item.name}
                      className={`h-5 w-5 object-contain transition-all ${
                        isActive 
                          ? "grayscale-0 opacity-100" 
                          : "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
                      }`}
                    />
                    {item.name}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;