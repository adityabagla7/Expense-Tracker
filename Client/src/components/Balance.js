import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import "./Balance.css";

function moneyFormatter(num) {
  let p = Math.abs(num).toFixed(2).split(".");
  return (
    "₹ " +
    (num < 0 ? "-" : "") +
    p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num + (i && !(i % 3) ? "," : "") + acc;
      }, "") +
    "." +
    p[1]
  );
}

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const income = transactions
    .filter((transaction) => transaction.description === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const savings = transactions
    .filter((transaction) => transaction.description === "saving")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenses = Math.abs(
    transactions
      .filter((transaction) => transaction.description === "expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0)
  );

  const balance = income - savings - expenses;

  return (
    <div className="balance-container">
      <h4>Your Total Balance</h4>
      <h1>{moneyFormatter(balance)}</h1>
      <div className="savings">
        <h4>Your Savings</h4>
        <h1>{moneyFormatter(savings)}</h1>
      </div>
    </div>
  );
};
