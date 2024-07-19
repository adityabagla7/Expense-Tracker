import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import "./AddTransaction.css";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("expense");

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount:
        description === "expense"
          ? -Math.abs(parseFloat(amount))
          : Math.abs(parseFloat(amount)),
      description,
    };

    addTransaction(newTransaction);
    setText("");
    setAmount("");
    setDescription("expense");
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Enter Cause</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter cause..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount (INR)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in INR..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <select
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="saving">Saving</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
