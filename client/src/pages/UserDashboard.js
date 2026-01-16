import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, Row, Col, Statistic, Progress, Select, DatePicker, Spin, Empty, Tag, Tooltip } from "antd";
import {
  WalletOutlined,
  RiseOutlined,
  FallOutlined,
  PieChartOutlined,
  LineChartOutlined,
  CalendarOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import Layout from "../components/Layout/Layout";
import moment from "moment";
import { useApiWithMessage } from "../hooks/useApi";
import ErrorAlert from "../components/common/ErrorAlert";
import "./UserDashboard.css";

const { RangePicker } = DatePicker;
const { Option } = Select;

const UserDashboard = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState("30");
  const [selectedDate, setSelectedDate] = useState([]);
  const [dashboardError, setDashboardError] = useState(null);
  const { request, loading } = useApiWithMessage();

  // Fetch transactions
  const fetchDashboardData = useCallback(async () => {
    setDashboardError(null);
    const result = await request(
      {
        url: "/api/v1/transections/get-transection",
        method: "POST",
        data: {
          frequency,
          selectedDate,
          type: "all",
        },
        requiresAuth: true,
      },
      {
        showSuccess: false,
        showError: false,
      }
    );

    if (result.error) {
      setDashboardError(result.error);
      return;
    }

    if (result.data?.transactions) {
      setAllTransactions(result.data.transactions);
    }
  }, [frequency, selectedDate, request]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const income = allTransactions
      .filter((t) => t.type === "Income")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);

    const expense = allTransactions
      .filter((t) => t.type === "Expense")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);

    const balance = income - expense;
    const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;

    // Category-wise breakdown
    const categoryData = allTransactions.reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = { amount: 0, count: 0, type: t.type };
      }
      acc[t.category].amount += parseFloat(t.amount);
      acc[t.category].count += 1;
      return acc;
    }, {});

    // Top categories
    const topExpenseCategories = Object.entries(categoryData)
      .filter(([_, data]) => data.type === "Expense")
      .sort((a, b) => b[1].amount - a[1].amount)
      .slice(0, 5);

    const topIncomeCategories = Object.entries(categoryData)
      .filter(([_, data]) => data.type === "Income")
      .sort((a, b) => b[1].amount - a[1].amount)
      .slice(0, 5);

    // Monthly trend (last 6 months)
    const monthlyTrend = {};
    allTransactions.forEach((t) => {
      const month = moment(t.date).format("MMM YYYY");
      if (!monthlyTrend[month]) {
        monthlyTrend[month] = { income: 0, expense: 0 };
      }
      if (t.type === "Income") {
        monthlyTrend[month].income += parseFloat(t.amount);
      } else {
        monthlyTrend[month].expense += parseFloat(t.amount);
      }
    });

    // Recent transactions
    const recentTransactions = [...allTransactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    // Average transaction
    const avgIncome = income / (allTransactions.filter((t) => t.type === "Income").length || 1);
    const avgExpense = expense / (allTransactions.filter((t) => t.type === "Expense").length || 1);

    return {
      income,
      expense,
      balance,
      savingsRate,
      categoryData,
      topExpenseCategories,
      topIncomeCategories,
      monthlyTrend,
      recentTransactions,
      avgIncome,
      avgExpense,
      totalTransactions: allTransactions.length,
    };
  }, [allTransactions]);

  return (
    <Layout>
      <div className="user-dashboard">
        <ErrorAlert error={dashboardError} onClose={() => setDashboardError(null)} />

        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <h1 className="dashboard-title">Financial Dashboard</h1>
              <p className="dashboard-subtitle">
                Track your income, expenses, and financial health
              </p>
            </div>
            <div className="header-filters">
              <Select
                value={frequency}
                onChange={setFrequency}
                className="frequency-select"
                suffixIcon={<CalendarOutlined />}
              >
                <Option value="7">Last 7 Days</Option>
                <Option value="30">Last 30 Days</Option>
                <Option value="90">Last 3 Months</Option>
                <Option value="365">Last Year</Option>
                <Option value="custom">Custom Range</Option>
              </Select>
              {frequency === "custom" && (
                <RangePicker
                  value={selectedDate}
                  onChange={(values) => setSelectedDate(values)}
                  className="date-range-picker"
                />
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <Spin size="large" tip="Loading dashboard data..." />
          </div>
        ) : allTransactions.length === 0 ? (
          <div className="empty-state">
            <Empty
              description="No transactions found. Start adding transactions to see your dashboard."
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        ) : (
          <>
            {/* Main Statistics Cards */}
            <Row gutter={[24, 24]} className="stats-row">
              <Col xs={24} sm={12} lg={6}>
                <Card className="stat-card income-card" bordered={false}>
                  <div className="stat-icon income-icon">
                    <ArrowUpOutlined />
                  </div>
                  <Statistic
                    title={<span className="stat-title">Total Income</span>}
                    value={statistics.income}
                    precision={2}
                    prefix="₹"
                    valueStyle={{ color: "#10b981", fontWeight: 700 }}
                  />
                  <div className="stat-footer">
                    <RiseOutlined /> Avg: ₹{statistics.avgIncome.toFixed(2)}
                  </div>
                </Card>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <Card className="stat-card expense-card" bordered={false}>
                  <div className="stat-icon expense-icon">
                    <ArrowDownOutlined />
                  </div>
                  <Statistic
                    title={<span className="stat-title">Total Expense</span>}
                    value={statistics.expense}
                    precision={2}
                    prefix="₹"
                    valueStyle={{ color: "#ef4444", fontWeight: 700 }}
                  />
                  <div className="stat-footer">
                    <FallOutlined /> Avg: ₹{statistics.avgExpense.toFixed(2)}
                  </div>
                </Card>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <Card className="stat-card balance-card" bordered={false}>
                  <div className="stat-icon balance-icon">
                    <WalletOutlined />
                  </div>
                  <Statistic
                    title={<span className="stat-title">Net Balance</span>}
                    value={statistics.balance}
                    precision={2}
                    prefix="₹"
                    valueStyle={{
                      color: statistics.balance >= 0 ? "#10b981" : "#ef4444",
                      fontWeight: 700,
                    }}
                  />
                  <div className="stat-footer">
                    <DollarOutlined /> {statistics.totalTransactions} transactions
                  </div>
                </Card>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <Card className="stat-card savings-card" bordered={false}>
                  <div className="stat-icon savings-icon">
                    <LineChartOutlined />
                  </div>
                  <Statistic
                    title={<span className="stat-title">Savings Rate</span>}
                    value={statistics.savingsRate}
                    precision={1}
                    suffix="%"
                    valueStyle={{ color: "#8b5cf6", fontWeight: 700 }}
                  />
                  <div className="stat-footer">
                    <Progress
                      percent={parseFloat(statistics.savingsRate)}
                      showInfo={false}
                      strokeColor="#8b5cf6"
                      trailColor="rgba(139, 92, 246, 0.1)"
                    />
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Charts and Analysis Section */}
            <Row gutter={[24, 24]} className="analysis-row">
              {/* Top Expense Categories */}
              <Col xs={24} lg={12}>
                <Card
                  className="analysis-card"
                  title={
                    <div className="card-header">
                      <FallOutlined className="card-icon expense-color" />
                      <span>Top Expense Categories</span>
                    </div>
                  }
                  bordered={false}
                >
                  {statistics.topExpenseCategories.length > 0 ? (
                    <div className="category-list">
                      {statistics.topExpenseCategories.map(([category, data], index) => {
                        const percentage = ((data.amount / statistics.expense) * 100).toFixed(1);
                        return (
                          <div key={category} className="category-item">
                            <div className="category-info">
                              <div className="category-rank">#{index + 1}</div>
                              <div className="category-details">
                                <span className="category-name">{category.replace("Expense in ", "")}</span>
                                <span className="category-count">{data.count} transactions</span>
                              </div>
                            </div>
                            <div className="category-amount">
                              <span className="amount">₹{data.amount.toLocaleString()}</span>
                              <Progress
                                percent={parseFloat(percentage)}
                                strokeColor="#ef4444"
                                trailColor="rgba(239, 68, 68, 0.1)"
                                showInfo={false}
                                className="category-progress"
                              />
                              <span className="percentage">{percentage}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <Empty description="No expense data available" />
                  )}
                </Card>
              </Col>

              {/* Top Income Categories */}
              <Col xs={24} lg={12}>
                <Card
                  className="analysis-card"
                  title={
                    <div className="card-header">
                      <RiseOutlined className="card-icon income-color" />
                      <span>Top Income Sources</span>
                    </div>
                  }
                  bordered={false}
                >
                  {statistics.topIncomeCategories.length > 0 ? (
                    <div className="category-list">
                      {statistics.topIncomeCategories.map(([category, data], index) => {
                        const percentage = ((data.amount / statistics.income) * 100).toFixed(1);
                        return (
                          <div key={category} className="category-item">
                            <div className="category-info">
                              <div className="category-rank income-rank">#{index + 1}</div>
                              <div className="category-details">
                                <span className="category-name">{category.replace("Income in ", "")}</span>
                                <span className="category-count">{data.count} transactions</span>
                              </div>
                            </div>
                            <div className="category-amount">
                              <span className="amount">₹{data.amount.toLocaleString()}</span>
                              <Progress
                                percent={parseFloat(percentage)}
                                strokeColor="#10b981"
                                trailColor="rgba(16, 185, 129, 0.1)"
                                showInfo={false}
                                className="category-progress"
                              />
                              <span className="percentage">{percentage}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <Empty description="No income data available" />
                  )}
                </Card>
              </Col>
            </Row>

            {/* Recent Transactions */}
            <Row gutter={[24, 24]}>
              <Col xs={24}>
                <Card
                  className="analysis-card recent-transactions-card"
                  title={
                    <div className="card-header">
                      <PieChartOutlined className="card-icon" />
                      <span>Recent Transactions</span>
                    </div>
                  }
                  bordered={false}
                >
                  <div className="recent-transactions-list">
                    {statistics.recentTransactions.map((transaction) => (
                      <div key={transaction.transactionId} className="transaction-item">
                        <div className="transaction-icon-wrapper">
                          <div
                            className={`transaction-icon ${
                              transaction.type === "Income" ? "income-bg" : "expense-bg"
                            }`}
                          >
                            {transaction.type === "Income" ? (
                              <ArrowUpOutlined />
                            ) : (
                              <ArrowDownOutlined />
                            )}
                          </div>
                        </div>
                        <div className="transaction-details">
                          <div className="transaction-header">
                            <span className="transaction-category">
                              {transaction.category}
                            </span>
                            <Tag
                              color={transaction.type === "Income" ? "success" : "error"}
                              className="transaction-type-tag"
                            >
                              {transaction.type}
                            </Tag>
                          </div>
                          <div className="transaction-meta">
                            <span className="transaction-reference">{transaction.refrence}</span>
                            <span className="transaction-date">
                              {moment(transaction.date).format("MMM DD, YYYY")}
                            </span>
                          </div>
                          {transaction.description && (
                            <Tooltip title={transaction.description}>
                              <p className="transaction-description">{transaction.description}</p>
                            </Tooltip>
                          )}
                        </div>
                        <div
                          className={`transaction-amount ${
                            transaction.type === "Income" ? "income-amount" : "expense-amount"
                          }`}
                        >
                          {transaction.type === "Income" ? "+" : "-"}₹
                          {parseFloat(transaction.amount).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Financial Health Indicator */}
            <Row gutter={[24, 24]}>
              <Col xs={24}>
                <Card className="health-card" bordered={false}>
                  <div className="health-content">
                    <h3 className="health-title">Financial Health Score</h3>
                    <div className="health-indicator">
                      <Progress
                        type="dashboard"
                        percent={parseFloat(statistics.savingsRate)}
                        strokeColor={{
                          "0%": "#ef4444",
                          "50%": "#f59e0b",
                          "100%": "#10b981",
                        }}
                        strokeWidth={12}
                        width={200}
                      />
                    </div>
                    <div className="health-insights">
                      <div className="insight-item">
                        <h4>
                          {statistics.savingsRate >= 20
                            ? "Excellent! 🎉"
                            : statistics.savingsRate >= 10
                            ? "Good Progress 👍"
                            : "Room for Improvement 💪"}
                        </h4>
                        <p>
                          {statistics.savingsRate >= 20
                            ? "You're saving a healthy portion of your income. Keep it up!"
                            : statistics.savingsRate >= 10
                            ? "You're saving well, but there's room to optimize expenses."
                            : "Consider reviewing your expenses to improve your savings rate."}
                        </p>
                      </div>
                      <div className="health-stats">
                        <div className="health-stat">
                          <span className="label">Income Transactions:</span>
                          <span className="value">
                            {allTransactions.filter((t) => t.type === "Income").length}
                          </span>
                        </div>
                        <div className="health-stat">
                          <span className="label">Expense Transactions:</span>
                          <span className="value">
                            {allTransactions.filter((t) => t.type === "Expense").length}
                          </span>
                        </div>
                        <div className="health-stat">
                          <span className="label">Most Expensive Category:</span>
                          <span className="value">
                            {statistics.topExpenseCategories[0]?.[0]?.replace("Expense in ", "") ||
                              "N/A"}
                          </span>
                        </div>
                        <div className="health-stat">
                          <span className="label">Top Income Source:</span>
                          <span className="value">
                            {statistics.topIncomeCategories[0]?.[0]?.replace("Income in ", "") ||
                              "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
    </Layout>
  );
};

export default UserDashboard;
