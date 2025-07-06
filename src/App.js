
import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import MonthlyExpensesChart from './components/MonthlyExpensesChart';
import CategoryPieChart from './components/CategoryPieChart';
import LandingPage from './components/LandingPage';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
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
    setActiveTab('list');
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setActiveTab('add');
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
    setActiveTab('list');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard transactions={transactions} />;
      case 'add':
        return (
          <TransactionForm
            onSubmit={handleAddTransaction}
            editingTransaction={editingTransaction}
            onCancel={handleCancelEdit}
          />
        );
      case 'list':
        return (
          <TransactionList
            transactions={transactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        );
      case 'charts':
        return (
          <div className="charts-section">
            <div className="chart-row">
              <div className="chart-card">
                <MonthlyExpensesChart transactions={transactions} />
              </div>
            </div>
            <div className="chart-row">
              <div className="chart-card">
                <CategoryPieChart transactions={transactions} />
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard transactions={transactions} />;
    }
  };

  if (showLanding) {
    return <LandingPage onEnterApp={() => setShowLanding(false)} />;
  }

  return (
    <div className="app">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
