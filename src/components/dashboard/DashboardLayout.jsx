import React from 'react';
export default function DashboardLayout({ sidebar, children }) {
    return (
      <div className="flex min-h-screen w-full bg-[#FFFFFF]">
        <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-[#ECF1FF] border-r border-gray-200">
          <div className="h-full flex flex-col">{sidebar}</div>
        </aside>

        <main className="flex-1 ml-64 flex flex-col min-h-screen">
          <div className="flex-1 p-4">{children}</div>
        </main>
      </div>
    );
}
