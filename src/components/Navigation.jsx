
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Plus, List, PieChart, DollarSign } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <DollarSign className="brand-icon" />
        <span className="brand-text">Finance Tracker</span>
      </div>
      
      <div className="nav-links">
        <Link 
          to="/dashboard" 
          className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <BarChart3 size={20} />
          <span>Dashboard</span>
        </Link>
        
        <Link 
          to="/add" 
          className={`nav-link ${isActive('/add') ? 'active' : ''}`}
        >
          <Plus size={20} />
          <span>Add Transaction</span>
        </Link>
        
        <Link 
          to="/transactions" 
          className={`nav-link ${isActive('/transactions') ? 'active' : ''}`}
        >
          <List size={20} />
          <span>Transactions</span>
        </Link>
        
        <Link 
          to="/analytics" 
          className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}
        >
          <PieChart size={20} />
          <span>Analytics</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
