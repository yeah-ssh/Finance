
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import MonthlyExpensesChart from './components/MonthlyExpensesChart';
import CategoryPieChart from './components/CategoryPieChart';
import LandingPage from './components/LandingPage';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Load transactions from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('financeTransactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Add some sample data for demonstration
      const sampleTransactions = [
        {
          id: 1,
          amount: 45.99,
          date: '2024-01-15',
          description: 'Grocery shopping',
          category: 'Groceries'
        },
        {
          id: 2,
          amount: 12.50,
          date: '2024-01-16',
          description: 'Coffee shop',
          category: 'Food & Dining'
        },
        {
          id: 3,
          amount: 89.99,
          date: '2024-01-17',
          description: 'Gas bill',
          category: 'Bills & Utilities'
        }
      ];
      setTransactions(sampleTransactions);
    }
  }, []);

  // Save transactions to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('financeTransactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (transactionData) => {
    if (editingTransaction) {
      setTransactions(prev => 
        prev.map(t => t.id === editingTransaction.id ? transactionData : t)
      );
      setEditingTransaction(null);
    } else {
      setTransactions(prev => [...prev, transactionData]);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  const ChartsPage = () => (
    <div className="charts-section">
      <div className="analytics-header">
        <h2>Financial Analytics</h2>
        <p className="analytics-description">
          Get detailed insights into your spending patterns and track your financial progress over time.
        </p>
      </div>
      
      <div className="chart-row">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Monthly Spending Trends</h3>
            <p>Track your monthly expenses to identify spending patterns and seasonal variations.</p>
          </div>
          <MonthlyExpensesChart transactions={transactions} />
        </div>
      </div>
      
      <div className="chart-row category-analysis">
        <div className="chart-card pie-chart-card">
          <div className="chart-header">
            <h3>Expense Distribution</h3>
            <p>See how your money is distributed across different categories to better understand your spending habits.</p>
          </div>
          <CategoryPieChart transactions={transactions} />
        </div>
        
        <div className="chart-card summary-card">
          <div className="chart-header">
            <h3>Category Breakdown</h3>
            <p>Detailed view of your spending by category with percentages and amounts.</p>
          </div>
          <div className="category-summary">
            {transactions.length > 0 ? (
              (() => {
                const categories = {};
                transactions.forEach(transaction => {
                  categories[transaction.category] = (categories[transaction.category] || 0) + transaction.amount;
                });
                
                const total = Object.values(categories).reduce((sum, amount) => sum + amount, 0);
                const sortedCategories = Object.entries(categories)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 8);
                
                return (
                  <div className="category-table">
                    <div className="table-header">
                      <span>Category</span>
                      <span>Amount</span>
                      <span>%</span>
                    </div>
                    {sortedCategories.map(([category, amount]) => {
                      const percentage = ((amount / total) * 100).toFixed(1);
                      return (
                        <div key={category} className="table-row">
                          <span className="category-name">{category}</span>
                          <span className="category-amount">₹{amount.toFixed(2)}</span>
                          <span className="category-percentage">{percentage}%</span>
                        </div>
                      );
                    })}
                    <div className="table-footer">
                      <span className="total-label">Total</span>
                      <span className="total-amount">₹{total.toFixed(2)}</span>
                      <span className="total-percentage">100%</span>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="empty-summary">
                <p>No transactions to analyze yet. Start by adding some transactions!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={
          <div className="app">
            <Navigation />
            <main className="main-content">
              <Dashboard transactions={transactions} />
            </main>
          </div>
        } />
        <Route path="/add" element={
          <div className="app">
            <Navigation />
            <main className="main-content">
              <TransactionForm
                onSubmit={handleAddTransaction}
                editingTransaction={editingTransaction}
                onCancel={handleCancelEdit}
              />
            </main>
          </div>
        } />
        <Route path="/transactions" element={
          <div className="app">
            <Navigation />
            <main className="main-content">
              <TransactionList
                transactions={transactions}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            </main>
          </div>
        } />
        <Route path="/analytics" element={
          <div className="app">
            <Navigation />
            <main className="main-content">
              <ChartsPage />
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
