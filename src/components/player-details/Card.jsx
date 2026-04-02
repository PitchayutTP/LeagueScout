export default function Card({  marketValue, contractEndDate }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-3 mt-2 w-full h-64">
        <h3 className="text-sm font-semibold text-gray-400">CURRENT MARKET VALUATION</h3>
        <h1 className="text-6xl font-bold text-gray-900 mt-6">${marketValue.toLocaleString()}</h1>
        <p className="text-sm font-bold text-gray-600 mt-10">CONTACT UNTIL</p>
        <h1 className="text-2xl font-bold text-gray-700">{contractEndDate}</h1>
    </div>
  );
}