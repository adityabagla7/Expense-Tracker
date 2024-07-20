import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
import "./AddTransaction.css";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("expense");
  const [budgetLimit, setBudgetLimit] = useState("");
  const [error, setError] = useState(null);
  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      date: new Date().toISOString().split('T')[0], 
      cause: text,
      description,
      amount: description === "expense" ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount)),
      budget: budgetLimit ? parseFloat(budgetLimit) : null
    };

    addTransaction(newTransaction);

    try {
      await axios.post('http://localhost:8081/api/transactions', newTransaction);
      // Clear state if successful
      setText("");
      setAmount("");
      setDescription("expense");
      setBudgetLimit("");
    } catch (error) {
      setError('There was an error adding the transaction.');
      console.error('Error:', error);
    }
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
        <div className="form-control">
          <label htmlFor="budgetLimit">Budget Limit (INR)</label>
          <input
            type="number"
            value={budgetLimit}
            onChange={(e) => setBudgetLimit(e.target.value)}
            placeholder="Enter budget limit in INR..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};




