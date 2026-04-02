import React from 'react';

export default function FilterPanel() {
    return (
        <div className="w-75 bg-white border-r border-slate-200 min-h-[calc(100vh-80px)] p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-black text-slate-900 tracking-wide">TACTICAL FILTERS</h2>
                <button className="text-xs font-bold text-blue-600 hover:text-blue-800">Reset</button>
            </div>

            {/* Position */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-500 mb-3">POSITION</h3>
                <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 text-sm text-slate-700 font-medium cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" /> Forward
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700 font-medium cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" /> Midfielder
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700 font-medium cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" /> Defender
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700 font-medium cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" /> Goalkeeper
                    </label>
                </div>
            </div>

            {/* Target League */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-500 mb-3">TARGET LEAGUE</h3>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-500">
                    <option>Premier League (UK)</option>
                    <option>La Liga (ES)</option>
                    <option>Serie A (IT)</option>
                </select>
            </div>

            {/* Market Value */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-slate-500">MARKET VALUE</h3>
                    <span className="text-xs font-bold text-blue-600">€10M - €85M</span>
                </div>
                <div className="relative h-2 bg-slate-200 rounded-full">
                    <div className="absolute left-[10%] right-[15%] h-full bg-blue-600 rounded-full"></div>
                    <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow cursor-pointer"></div>
                    <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow cursor-pointer"></div>
                </div>
            </div>

            {/* Age Range */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-slate-500">AGE RANGE</h3>
                    <span className="text-xs font-bold text-blue-600">18 - 24</span>
                </div>
                <div className="flex items-center gap-4">
                    <input type="text" defaultValue="18" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-center font-semibold text-slate-700" />
                    <input type="text" defaultValue="24" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-center font-semibold text-slate-700" />
                </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm mt-4">
                Apply Tactical Filters
            </button>
        </div>
    );
}