import React from 'react';
import { LayoutDashboard, UserSearch, BarChart3, Settings } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-slate-50 border-r border-slate-200 h-screen fixed top-0 left-0 flex flex-col">
            <div className="p-6">
                <h1 className="text-base font-black text-slate-900 tracking-tight">SCOUTING AUTHORITY</h1>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Elite Analytical Lens</p>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                    <LayoutDashboard size={18} />
                    DASHBOARD
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-blue-700 bg-blue-50 border-r-4 border-blue-600 rounded-lg transition-colors">
                    <UserSearch size={18} />
                    PLAYER SEARCH
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                    <BarChart3 size={18} />
                    MARKET INSIGHTS
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                    <Settings size={18} />
                    SETTINGS
                </a>
            </nav>
        </aside>
    );
}