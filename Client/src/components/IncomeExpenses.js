import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import "./IncomeExpenses.css";
function moneyFormatter(num) {
  let p = Math.abs(num).toFixed(2).split('.');
  return (
    '₹ ' +
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

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const income = transactions
    .filter(transaction => transaction.description === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expense = transactions
    .filter(transaction => transaction.description === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const savings = transactions
    .filter(transaction => transaction.description === 'saving')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">{moneyFormatter(income)}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">{moneyFormatter(Math.abs(expense))}</p>
        </div>
        <div>
          <h4>Savings</h4>
          <p className="money saving">{moneyFormatter(savings)}</p>
        </div>
      </div>
  )
}
