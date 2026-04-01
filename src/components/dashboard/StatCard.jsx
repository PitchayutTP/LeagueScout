
export default function StatCard({ title, value, change }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-3 mt-2 w-[15%] h-auto">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      <p className={`text-sm mt-2 ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
        {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
      </p>
    </div>
  );
}