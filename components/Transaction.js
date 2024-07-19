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
      .reduce(function (acc, num, i, orig) {
        return num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleString(undefined, options);
}

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const transactionDate = transaction.date ? new Date(transaction.date) : new Date();

  return (
    <li className="transaction-item">
      <span className="transaction-date">{formatDate(transactionDate)}</span>
      <span className="transaction-text">{transaction.text}</span>
      <span className="transaction-description">{transaction.description}</span>
      <span className={`transaction-amount ${transaction.amount < 0 ? 'minus' : 'plus'}`}>
        {moneyFormatter(transaction.amount)}
      </span>
      <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
    </li>
  )
}