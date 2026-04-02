import React from 'react';
import './App.css';
import ExpenseTracker from './components/ExpenseTracker';
import { ExpenseProvider } from './context/ExpenseContext';

export default function App() {
  return (
    <ExpenseProvider>
      <ExpenseTracker />
    </ExpenseProvider>
  );
}
