import React from "react";
export default function TopHeader() {
  return (
    <header className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-6 sticky top-0 z-40">
      {/* --- ส่วนซ้าย: Logo & Search --- */}
      <div className="flex items-center gap-8 flex-1">
        <h1 className="text-2xl font-bold text-black-800 tracking-tight">
          LeagueScout
        </h1>

        {/* ช่อง Search */}
        <div className="relative w-full max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img
              src="/search.png"
              alt="Search"
              className="h-4 w-4 object-contain opacity-50 group-focus-within:opacity-100 transition-opacity"
            />
            <div className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Search athletes, leagues, or metrics..."
          />
        </div>
      </div>

      {/* --- ส่วนขวา: Notification & Profile --- */}
      <div className="flex items-center gap-5">
        {/* ปุ่มกระดิ่ง (Notification) */}
        <div className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
          <img
            src="/notification.png"
            alt="Notification_Icon"
            className="h-6 w-6 object-contain"
          />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 group ">
          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200 group-hover:bg-blue-200 transition-border-gray-300 hover:border-blue-600">
            <img src="userProfile_icon.png" alt="User Profile" />
            <div className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
