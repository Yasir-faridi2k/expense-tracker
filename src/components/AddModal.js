// src/components/AddModal.js
import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';

export default function AddModal({ onClose }) {
  const { addTransaction } = useExpenses();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!name.trim()) { setError('Please enter a name.'); return; }
    if (!amount || isNaN(amount) || Number(amount) <= 0) { setError('Please enter a valid amount.'); return; }
    addTransaction({ name: name.trim(), amount: Number(amount), type });
    onClose();
  };

  return (
    /* Backdrop */
    <div style={styles.backdrop} onClick={onClose}>
      {/* Modal box — stop click from closing */}
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 style={styles.modalTitle}>Add Transaction</h2>

        {error && <p style={styles.error}>{error}</p>}

        {/* Type toggle */}
        <div style={styles.toggleRow}>
          <button
            style={{ ...styles.toggleBtn, ...(type === 'expense' ? styles.toggleActive : {}) }}
            onClick={() => setType('expense')}
          >
            Expense
          </button>
          <button
            style={{ ...styles.toggleBtn, ...(type === 'income' ? styles.toggleActiveGreen : {}) }}
            onClick={() => setType('income')}
          >
            Income / Budget
          </button>
        </div>

        {/* Name */}
        <label style={styles.label}>Name</label>
        <input
          style={styles.input}
          placeholder="e.g. Birthday Gifts"
          value={name}
          onChange={e => { setName(e.target.value); setError(''); }}
        />

        {/* Amount */}
        <label style={styles.label}>Amount (₹)</label>
        <input
          style={styles.input}
          type="number"
          placeholder="e.g. 500"
          value={amount}
          onChange={e => { setAmount(e.target.value); setError(''); }}
        />

        {/* Buttons */}
        <div style={styles.btnRow}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={styles.confirmBtn} onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  modal: {
    background: '#fff',
    borderRadius: 10,
    padding: '28px 24px',
    width: '100%',
    maxWidth: 380,
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111',
  },
  error: {
    color: '#e53935',
    fontSize: 13,
    marginBottom: 10,
  },
  toggleRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 16,
  },
  toggleBtn: {
    flex: 1,
    padding: '8px',
    borderRadius: 6,
    border: '1px solid #ccc',
    background: '#f5f5f5',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
  },
  toggleActive: {
    background: '#e53935',
    color: '#fff',
    border: '1px solid #e53935',
  },
  toggleActiveGreen: {
    background: '#43a047',
    color: '#fff',
    border: '1px solid #43a047',
  },
  label: {
    display: 'block',
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #ccc',
    borderRadius: 6,
    fontSize: 15,
    marginBottom: 14,
    outline: 'none',
    color: '#111',
    fontFamily: 'inherit',
  },
  btnRow: {
    display: 'flex',
    gap: 10,
    marginTop: 4,
  },
  cancelBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: 6,
    border: '1px solid #ccc',
    background: '#f5f5f5',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  confirmBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: 6,
    border: 'none',
    background: '#4caf50',
    color: '#fff',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 'bold',
  },
};