import React from 'react';
export default function DashboardLayout({ sidebar, children }) {
    return (
      <div className="flex min-h-screen w-full bg-[#FFFFFF]">
        {/* --- ส่วนที่ 1: Sidebar (ฝั่งซ้าย) --- */}
        <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-[#ECF1FF] border-r border-gray-200">
          <div className="h-full flex flex-col">{sidebar}</div>
        </aside>

        {/* --- ส่วนที่ 2: Content Area (ฝั่งขวา) --- */}
        <main className="flex-1 ml-64 flex flex-col min-h-screen">
          <div className="flex-1 p-4">{children}</div>
        </main>
      </div>
    );
}
