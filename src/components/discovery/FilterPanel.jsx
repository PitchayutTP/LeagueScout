import React, { useState, useEffect } from 'react';

export default function FilterPanel({ onFilterChange, players }) {
    const [selectedPositions, setSelectedPositions] = useState(['Forward', 'Midfielder', 'Defender', 'Goalkeeper']);
    const [league, setLeague] = useState('All');
    const [valueRange, setValueRange] = useState(200);
    const [ageRange, setAgeRange] = useState({ min: 15, max: 40 });

    const positionMap = {
        'Forward': ['ST', 'RW', 'LW', 'CF'],
        'Midfielder': ['CAM', 'CDM', 'CM', 'LM', 'RM'],
        'Defender': ['CB', 'RB', 'LB', 'RWB', 'LWB'],
        'Goalkeeper': ['GK']
    };

    // --- จุดสำคัญ: ใช้ useEffect ส่งค่ากลับไปหา Parent ทันทีที่ State ในนี้เปลี่ยน ---
    useEffect(() => {
        const filters = {
            // ดึงค่าตัวย่อจาก PositionMap (เช่น ST, LW) ออกมาเป็น Array แผ่นเดียว
            positions: selectedPositions.flatMap(p => positionMap[p]),
            league,
            maxValue: valueRange * 1000000,
            ageMin: parseInt(ageRange.min),
            ageMax: parseInt(ageRange.max)
        };
        onFilterChange(filters);
    }, [selectedPositions, league, valueRange, ageRange]); // ทำงานทุกครั้งที่ค่าเหล่านี้เปลี่ยน

    const handlePositionChange = (pos) => {
        setSelectedPositions(prev => 
            prev.includes(pos) ? prev.filter(p => p !== pos) : [...prev, pos]
        );
    };

    const handleReset = () => {
        setSelectedPositions(['Forward', 'Midfielder', 'Defender', 'Goalkeeper']);
        setLeague('All');
        setValueRange(200);
        setAgeRange({ min: 15, max: 40 });
    };

    return (
        // ปรับ CSS ให้ติดขอบซ้ายและสูงเต็มจอตามที่คุณต้องการ
        <div className="w-80 bg-white border-r border-slate-200 min-h-screen sticky top-0 self-start p-6 z-10">
            <div className="flex items-center justify-between mb-6 mt-5">
                <h2 className="text-sm font-black text-slate-900 tracking-wide">TACTICAL FILTERS</h2>
            </div>

            {/* ส่วนของ Position Category */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-500 mb-3">POSITION CATEGORY</h3>
                <div className="grid grid-cols-1 gap-2">
                    {Object.keys(positionMap).map(pos => (
                        <label key={pos} className="flex items-center gap-2 text-sm text-slate-700 font-medium cursor-pointer hover:text-blue-600 transition-colors">
                            <input 
                                type="checkbox" 
                                checked={selectedPositions.includes(pos)}
                                onChange={() => handlePositionChange(pos)}
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" 
                            /> {pos}
                        </label>
                    ))}
                </div>
            </div>

            {/* ส่วนของ League */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-500 mb-3">TARGET LEAGUE</h3>
                <select 
                    value={league}
                    onChange={(e) => setLeague(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-500 bg-slate-50"
                >
                    <option value="All">All Leagues</option>
                    <option value="Premier League">Premier League (UK)</option>
                    <option value="La Liga">La Liga (ES)</option>
                    <option value="Serie A">Serie A (IT)</option>
                    <option value="Bundesliga">Bundesliga (DE)</option>
                </select>
            </div>

            {/* ส่วนของ Market Value */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-slate-500">MAX MARKET VALUE</h3>
                    <span className="text-xs font-bold text-blue-600">€{valueRange}M</span>
                </div>
                <input 
                    type="range" 
                    min="10" 
                    max="200" 
                    value={valueRange}
                    onChange={(e) => setValueRange(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-bold">
                    <span>€10M</span>
                    <span>€200M</span>
                </div>
            </div>

            {/* ส่วนของ Age Range */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-500 mb-3">AGE RANGE</h3>
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <p className="text-[10px] text-slate-400 mb-1 font-bold">MIN</p>
                        <input 
                            type="number" 
                            value={ageRange.min}
                            onChange={(e) => setAgeRange({...ageRange, min: e.target.value})}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-center font-semibold text-slate-700 focus:border-blue-500 outline-none" 
                        />
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] text-slate-400 mb-1 font-bold">MAX</p>
                        <input 
                            type="number" 
                            value={ageRange.max}
                            onChange={(e) => setAgeRange({...ageRange, max: e.target.value})}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-center font-semibold text-slate-700 focus:border-blue-500 outline-none" 
                        />
                    </div>
                </div>
            </div>
            <button 
                onClick={handleReset}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-200 text-sm mt-4 active:scale-95"
            >
                Reset
            </button>
        </div>
    );
}