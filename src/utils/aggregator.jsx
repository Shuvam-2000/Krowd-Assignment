// get total revenue
export const getTotalRevenue = (data) => {
  return data.reduce((sum, row) => sum + row.revenue, 0);
};

// get monthly grouped revenue
export const getMonthlyData = (data) => {
  const monthly = {};
  data.forEach((row) => {
    const month = row.date.slice(0, 7); 
    if (!monthly[month]) monthly[month] = 0;
    monthly[month] += row.revenue;
  });
  return Object.entries(monthly).map(([month, revenue]) => ({ month, revenue }));
};

// revenue growth
export const getRevenueGrowth = (monthlyData) => {
  if (monthlyData.length < 2) return 0;
  const first = monthlyData[0].revenue;
  const last = monthlyData[monthlyData.length - 1].revenue;
  return (((last - first) / first) * 100).toFixed(2);
};

// product revenue share
export const getProductShare = (data) => {
  const productTotals = {};
  data.forEach((row) => {
    if (!productTotals[row.product]) productTotals[row.product] = 0;
    productTotals[row.product] += row.revenue;
  });
  return Object.entries(productTotals).map(([name, value]) => ({ name, value }));
};

// top 5 Products by revenue
export const getTopProducts = (data) => {
  const productTotals = {};
  data.forEach((row) => {
    if (!productTotals[row.product]) productTotals[row.product] = 0;
    productTotals[row.product] += row.revenue;
  });
  return Object.entries(productTotals)
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
};

// top 5 Customers by revenue
export const getTopCustomers = (data) => {
  const customerTotals = {};
  data.forEach((row) => {
    if (!customerTotals[row.client]) customerTotals[row.client] = 0;
    customerTotals[row.client] += row.revenue;
  });
  return Object.entries(customerTotals)
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
};
