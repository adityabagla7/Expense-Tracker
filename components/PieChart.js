// components/PieChart.js
import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { GlobalContext } from '../context/GlobalState';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = () => {
  const { transactions } = useContext(GlobalContext);

  const income = transactions
    .filter(transaction => transaction.description === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const savings = transactions
    .filter(transaction => transaction.description === 'saving')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenses = Math.abs(transactions
    .filter(transaction => transaction.description === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0));

  const data = {
    labels: ['Income', 'Savings', 'Expenses'],
    datasets: [
      {
        data: [income, savings, expenses],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Financial Distribution',
      },
    },
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: 'auto' }}>
      <h2>Financial Breakdown</h2>
      <Pie data={data} options={options} />
    </div>
  );
};