
import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ transactions }) => {
  const categoryData = useMemo(() => {
    const categories = {};
    
    transactions.forEach(transaction => {
      categories[transaction.category] = (categories[transaction.category] || 0) + transaction.amount;
    });

    const colors = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
      '#FF6384',
      '#C9CBCF',
      '#4BC0C0',
      '#FF6384'
    ];

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    return {
      labels,
      datasets: [
        {
          label: 'Expenses by Category',
          data,
          backgroundColor: colors.slice(0, labels.length),
          borderColor: colors.slice(0, labels.length).map(color => color.replace('0.8', '1')),
          borderWidth: 1,
        },
      ],
    };
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Expenses by Category',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: $${context.raw.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className="chart-container">
      {transactions.length > 0 ? (
        <Pie data={categoryData} options={options} />
      ) : (
        <div className="empty-chart">
          <p>No data to display</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPieChart;
