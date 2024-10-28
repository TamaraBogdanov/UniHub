import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  Calendar,
  PieChart,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartPie,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

function AnalyticsTab({ financialInfo, formatAmount }) {
  const [timeframe, setTimeframe] = useState("yearly");
  const [chartType, setChartType] = useState("expenses");
  const [chartData, setChartData] = useState([]);
  const [metrics, setMetrics] = useState({
    monthlyAvg: 0,
    totalSpent: 0,
    projectedSpend: 0,
    savingsRate: 0,
  });

  useEffect(() => {
    // Generate analytics data based on timeframe and type
    generateAnalyticsData();
  }, [timeframe, chartType, financialInfo]);

  const generateAnalyticsData = () => {
    // Sample data generation - in real app, this would process actual financial data
    const data = {
      monthly: {
        expenses: [
          { name: "Jan", amount: 5000 },
          { name: "Feb", amount: 4500 },
          { name: "Mar", amount: 6000 },
          { name: "Apr", amount: 5500 },
          { name: "May", amount: 4800 },
          { name: "Jun", amount: 5200 },
        ],
        categories: [
          { name: "Tuition", value: 60 },
          { name: "Housing", value: 20 },
          { name: "Meals", value: 10 },
          { name: "Books", value: 5 },
          { name: "Other", value: 5 },
        ],
      },
      yearly: {
        expenses: [
          { name: "2021", amount: 58000 },
          { name: "2022", amount: 62000 },
          { name: "2023", amount: 65000 },
          { name: "2024", amount: 68000 },
        ],
      },
    };

    setChartData(
      timeframe === "monthly" ? data.monthly.expenses : data.yearly.expenses
    );

    // Calculate metrics
    const totalSpent = chartData.reduce((sum, item) => sum + item.amount, 0);
    const monthlyAvg = totalSpent / chartData.length;

    setMetrics({
      monthlyAvg: monthlyAvg,
      totalSpent: totalSpent,
      projectedSpend: monthlyAvg * 12,
      savingsRate: ((totalSpent - monthlyAvg) / totalSpent) * 100,
    });
  };

  // Color scales for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="analytics-tab">
      {/* Controls Section */}
      <div className="analytics-controls">
        <div className="control-group">
          <label>Timeframe</label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="timeframe-select"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="control-group">
          <label>View Type</label>
          <div className="chart-type-buttons">
            <button
              className={`chart-type-button ${
                chartType === "expenses" ? "active" : ""
              }`}
              onClick={() => setChartType("expenses")}
            >
              <LineChartIcon size={16} />
              Expenses
            </button>
            <button
              className={`chart-type-button ${
                chartType === "categories" ? "active" : ""
              }`}
              onClick={() => setChartType("categories")}
            >
              <PieChart size={16} />
              Categories
            </button>
            <button
              className={`chart-type-button ${
                chartType === "trends" ? "active" : ""
              }`}
              onClick={() => setChartType("trends")}
            >
              <BarChartIcon size={16} />
              Trends
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h4>Average Monthly Spend</h4>
          <p className="amount">{formatAmount(metrics.monthlyAvg)}</p>
          <span className="trend positive">
            <TrendingUp size={16} />
            +5% vs last period
          </span>
        </div>
        <div className="metric-card">
          <h4>Total Spend YTD</h4>
          <p className="amount">{formatAmount(metrics.totalSpent)}</p>
          <span className="trend negative">
            <TrendingDown size={16} />
            -2% vs last year
          </span>
        </div>
        <div className="metric-card">
          <h4>Projected Annual Spend</h4>
          <p className="amount">{formatAmount(metrics.projectedSpend)}</p>
          <span className="info">
            <AlertCircle size={16} />
            Based on current trends
          </span>
        </div>
        <div className="metric-card">
          <h4>Savings Rate</h4>
          <p className="amount">{metrics.savingsRate.toFixed(1)}%</p>
          <span className="trend positive">
            <TrendingUp size={16} />
            +1.2% vs target
          </span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <div className="chart-container">
          {chartType === "expenses" && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => formatAmount(value)}
                  labelFormatter={(label) => `Period: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {chartType === "categories" && (
            <ResponsiveContainer width="100%" height={400}>
              <RechartPie>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </RechartPie>
            </ResponsiveContainer>
          )}

          {chartType === "trends" && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => formatAmount(value)}
                  labelFormatter={(label) => `Period: ${label}`}
                />
                <Legend />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Additional Analysis */}
        <div className="analysis-section">
          <h3>Key Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-header">
                <Calendar size={20} />
                <h4>Spending Patterns</h4>
              </div>
              <p>
                Your highest spending month was March with {formatAmount(6000)}.
                Consider reviewing expenses during high-spend periods.
              </p>
            </div>
            <div className="insight-card">
              <div className="insight-header">
                <TrendingUp size={20} />
                <h4>Growth Analysis</h4>
              </div>
              <p>
                Year-over-year spending has increased by 5%. Main drivers are
                tuition and housing costs.
              </p>
            </div>
            <div className="insight-card">
              <div className="insight-header">
                <AlertCircle size={20} />
                <h4>Recommendations</h4>
              </div>
              <ul className="recommendations-list">
                <li>Consider early payment discounts for next semester</li>
                <li>Review meal plan usage to optimize costs</li>
                <li>Explore additional scholarship opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Download Reports Section */}
      <div className="reports-section">
        <h3>Financial Reports</h3>
        <div className="reports-grid">
          <button className="report-button">
            <DollarSign size={16} />
            Download Expense Report
          </button>
          <button className="report-button">
            <BarChartIcon size={16} />
            Download Analytics Summary
          </button>
          <button className="report-button">
            <Calendar size={16} />
            Schedule Monthly Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsTab;
