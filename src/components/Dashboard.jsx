import salesData from "../data/sales.json";
import {
  getTotalRevenue,
  getMonthlyData,
  getRevenueGrowth,
  getProductShare,
  getTopProducts,
  getTopCustomers,
} from "../utils/aggregator";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const totalRevenue = getTotalRevenue(salesData);

  const monthlyData = getMonthlyData(salesData).map((d) => ({
    ...d,
    target: 6000,
  }));

  const growth = getRevenueGrowth(monthlyData);

  // calculate target achievement 
  const totalTarget = monthlyData.reduce((sum, month) => sum + month.target, 0);
  const targetAchievement = ((totalRevenue / totalTarget) * 100).toFixed(2);

  // product share for Pie Chart
  const productShare = getProductShare(salesData);
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c"];

  // top 5 Products & Customers
  const topProducts = getTopProducts(salesData);
  const topCustomers = getTopCustomers(salesData);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Sales & Revenue Dashboard</h1>

      {/* KPIs Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-gray-500 text-sm">Total Revenue</h2>
          <p className="text-xl font-semibold">₹{totalRevenue}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-gray-500 text-sm">Target Achievement</h2>
          <p className="text-xl font-semibold">{targetAchievement}%</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-gray-500 text-sm">Revenue Growth</h2>
          <p className="text-xl font-semibold">{growth}%</p>
        </div>
      </div>

      {/* Line Chart: Sales vs Target */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Sales vs Target</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Sales" />
            <Line type="monotone" dataKey="target" stroke="#82ca9d" name="Target" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart: Product Share */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Product Revenue Share</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={productShare}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {productShare.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top 5 Products Table */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Top 5 Products</h2>
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Product</th>
              <th className="border px-2 py-1">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((item, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">₹{item.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top 5 Customers Table */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Top 5 Customers</h2>
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Customer</th>
              <th className="border px-2 py-1">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((item, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">₹{item.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
