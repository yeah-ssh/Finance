
import React from 'react';
import { BarChart3, List, PlusCircle, PieChart } from 'lucide-react';

const Navigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'add', label: 'Add Transaction', icon: PlusCircle },
    { id: 'list', label: 'Transactions', icon: List },
    { id: 'charts', label: 'Analytics', icon: PieChart },
  ];

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h1>Finance Tracker</h1>
      </div>
      <div className="nav-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
