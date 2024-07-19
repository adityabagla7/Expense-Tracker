import React, { useContext } from "react";
import { Transaction } from "./Transaction";
import { GlobalContext } from "../context/GlobalState";

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        <li className="list-header">
          <div class="col-md-6"><span>Date</span></div>
          <div class="col-md-2"><span>Cause</span></div>
          <div class="col-md-2"><span>Description</span></div>
          <div class="col-md-2"><span>Amount</span></div>
        </li>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
