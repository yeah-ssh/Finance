
import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyExpensesChart = ({ transactions }) => {
  const monthlyData = useMemo(() => {
    const months = {};
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      
      if (!months[monthKey]) {
        months[monthKey] = { name: monthName, total: 0 };
      }
      months[monthKey].total += transaction.amount;
    });

    const sortedMonths = Object.keys(months).sort();
    const last6Months = sortedMonths.slice(-6);
    
    return {
      labels: last6Months.map(key => months[key].name),
      datasets: [
        {
          label: 'Monthly Expenses',
          data: last6Months.map(key => months[key].total),
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Expenses (Last 6 Months)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(0);
          }
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Bar data={monthlyData} options={options} />
    </div>
  );
};

export default MonthlyExpensesChart;
