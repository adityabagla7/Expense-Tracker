import React from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { PieChart } from './components/PieChart';
import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <div className="content-wrapper">
          <div className="left-column">
            <Balance />
            <IncomeExpenses />
            <AddTransaction />
          </div>
          <div className="right-column">
            <PieChart />
            <TransactionList />
          </div>
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;