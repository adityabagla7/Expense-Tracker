import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import './Transaction.css';

function moneyFormatter(num) {
  let p = Math.abs(num).toFixed(2).split('.');
  return (
    '₹' +
    p[0]
      .split('')
      .reverse()
      .reduce((acc, num, i) => num + (i && !(i % 3) ? ',' : '') + acc, '') +
    '.' +
    p[1]
  );
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric'};
  return new Date(date).toLocaleString(undefined, options);
}

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  return (
    <li className="transaction-item">
      <span className="transaction-date">{formatDate(transaction.date)}</span>
      <span className="transaction-cause">{transaction.cause}</span>
      <span className="transaction-description">{transaction.description}</span>
      <span className={`transaction-amount ${transaction.amount < 0 ? 'minus' : 'plus'}`}>
        {moneyFormatter(transaction.amount)}
      </span>
      <span className="transaction-budgetLimit">
        {transaction.budget !== null ? moneyFormatter(transaction.budget) : 'N/A'}
      </span>
      <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
    </li>
  );
};

