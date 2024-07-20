// components/PieChart.js
import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { GlobalContext } from '../context/GlobalState';
import './PieChart.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export const PieChart = () => {
  const { transactions } = useContext(GlobalContext);

  // Income calculation
  const income = transactions
    .filter(transaction => transaction.description === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Savings calculation
  const savings = transactions
    .filter(transaction => transaction.description === 'saving')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Expenses calculation
  const expenses = Math.abs(transactions
    .filter(transaction => transaction.description === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0));

  // Data for the Pie chart with fallback values
  const data = {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [
      {
        label: 'Financial Breakdown',
        data: [income || 0, expenses || 0, savings || 0],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 205, 86, 0.8)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)'
        ],
        borderWidth: 1,
      }
    ],
  };

  return (
    <div className="pie-chart">

    <div className="pie-chart-container">
      <h2 className="pie-chart-title">Financial Breakdown</h2>
      <Pie data={data} />
    </div>
    </div>
  );
};




