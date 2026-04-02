// src/components/TransactionItem.js
import React from 'react';
import { useExpenses } from '../context/ExpenseContext';

export default function TransactionProduct({ transaction }) {
  const { removeTransaction } = useExpenses();
  const isExpense = transaction.type === 'expense';

  return (
    <div style={styles.row}>
      {/* Left color bar */}
      <div style={{ ...styles.bar, background: isExpense ? '#e53935' : '#43a047' }} />

      {/* Name */}
      <span style={styles.name}>{transaction.name}</span>

      {/* Amount */}
      <span style={styles.amount}>₹{transaction.amount}</span>

      {/* Remove button */}
      <button
        style={styles.removeBtn}
        onClick={() => removeTransaction(transaction.id)}
      >
        Remove
      </button>
    </div>
  );
}

const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    padding: '14px 14px',
    gap: 12,
    background: '#fff',
  },
  bar: {
    width: 5,
    height: 40,
    borderRadius: 4,
    flexShrink: 0,
    marginRight: 4,
  },
  name: {
    flex: 1,
    fontSize: 15,
    color: '#111',
  },
  amount: {
    fontSize: 15,
    color: '#111',
    marginRight: 12,
    flexShrink: 0,
  },
  removeBtn: {
    background: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '8px 16px',
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
    flexShrink: 0,
  },
};