import React from 'react';
import { Star, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlayerCard({ player }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative flex flex-col items-center">
            <button className="absolute top-4 right-4 text-slate-300 hover:text-amber-400 transition-colors">
                <Star size={20} />
            </button>

            <div className="relative mb-4">
                <img src={player.imageUrl} alt={player.name} className="w-20 h-20 rounded-full object-cover border-4 border-slate-50" />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs font-black w-8 h-8 flex items-center justify-center rounded-full border-2 border-white">
                    {player.rating}
                </div>
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">{player.name}</h3>

            <div className="flex items-center gap-2 mb-3">
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black px-2 py-0.5 rounded-full tracking-wider">
                    {player.role}
                </span>
                <span className="text-xs font-bold text-slate-500">AGE: {player.age}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-6">
                <Building2 size={14} className="text-slate-400" />
                {player.club}
            </div>

            <div className="w-full grid grid-cols-3 gap-4 mb-6">
                {Object.entries(player.stats).map(([statName, value]) => (
                    <div key={statName} className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">{statName}</span>
                        <span className="text-lg font-black text-slate-900 mb-1">{value}</span>
                    </div>
                ))}
            </div>

            <Link to={`/players/${player.id}`} className="w-full text-center bg-blue-50 text-blue-600 font-bold py-2.5 rounded-xl text-sm hover:bg-blue-100 transition-colors mt-auto">
                FULL REPORT
            </Link>
        </div>
    );
}