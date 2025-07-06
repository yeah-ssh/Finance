
import React from 'react';
import { Wallet, TrendingUp, Calendar, PieChart } from 'lucide-react';

const Dashboard = ({ transactions }) => {
  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const categoryTotals = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryTotals).reduce(
    (max, [category, amount]) => amount > max.amount ? { category, amount } : max,
    { category: 'None', amount: 0 }
  );

  const recentTransactions = transactions.slice(-3);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon">
            <Wallet size={24} />
          </div>
          <div className="card-content">
            <h3>Total Expenses</h3>
            <p className="amount">₹{totalExpenses.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon">
            <PieChart size={24} />
          </div>
          <div className="card-content">
            <h3>Top Category</h3>
            <p className="category">{topCategory.category}</p>
            <p className="amount">₹{topCategory.amount.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon">
            <Calendar size={24} />
          </div>
          <div className="card-content">
            <h3>Total Transactions</h3>
            <p className="count">{transactions.length}</p>
          </div>
        </div>
      </div>
      
      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        {recentTransactions.length > 0 ? (
          <div className="transaction-list">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="recent-transaction">
                <div>
                  <span className="description">{transaction.description}</span>
                  <span className="category">{transaction.category}</span>
                </div>
                <span className="amount">₹{transaction.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No transactions yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
