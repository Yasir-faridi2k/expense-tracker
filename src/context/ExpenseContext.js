// src/context/ExpenseContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ExpenseContext = createContext();
const KEY = 'expense_tracker_data';

function getInitial() {
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'REMOVE':
      return state.filter(t => t.id !== action.payload);
    default:
      return state;
  }
}

export function ExpenseProvider({ children }) {
  const [transactions, dispatch] = useReducer(reducer, [], getInitial);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (item) =>
    dispatch({ type: 'ADD', payload: { ...item, id: Date.now() } });

  const removeTransaction = (id) =>
    dispatch({ type: 'REMOVE', payload: id });

  return (
    <ExpenseContext.Provider value={{ transactions, addTransaction, removeTransaction }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}