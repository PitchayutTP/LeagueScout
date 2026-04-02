
export default function StatCard({ title, value, change }) {
  const displayValue = value !== undefined && value !== null ? value : "0";
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-3 mt-2 w-[15%] h-auto">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        {title}
      </h3>
      
      <p className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
        {displayValue}
      </p>

      {/* แสดงส่วนต่าง (Change) เฉพาะเมื่อมีการส่งค่ามา */}
      {change !== undefined && (
        <div className={`flex items-center gap-1 text-sm font-bold mt-2 ${
          change >= 0 ? "text-emerald-500" : "text-rose-500"
        }`}>
          <span>{change >= 0 ? "↑" : "↓"}</span>
          <span>{Math.abs(change)}%</span>
          <span className="text-slate-400 font-medium text-[10px] ml-1">VS LAST MONTH</span>
        </div>
      )}
    </div>
  );
}