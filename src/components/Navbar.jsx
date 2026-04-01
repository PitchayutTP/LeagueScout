import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
            <div className="flex items-center gap-12">
                <div className="text-xl font-black text-slate-900">LeagueScout</div>
                <nav className="flex items-center gap-8 h-full">
                    <a href="#" className="text-sm font-bold text-blue-600 border-b-2 border-blue-600 pb-7 pt-7">Discovery</a>
                    <a href="#" className="text-sm font-semibold text-slate-500 hover:text-slate-900 pb-7 pt-7">Shortlist</a>
                    <a href="#" className="text-sm font-semibold text-slate-500 hover:text-slate-900 pb-7 pt-7">Reports</a>
                </nav>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search players..."
                        className="w-64 bg-slate-100 text-sm rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                </div>
                <button className="text-slate-600 hover:text-slate-900 relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-blue-600 rounded-full"></span>
                </button>
                <button className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-300">
                    <User size={16} />
                </button>
            </div>
        </header>
    );
}