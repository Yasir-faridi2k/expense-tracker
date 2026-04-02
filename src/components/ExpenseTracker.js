// src/components/ExpenseTracker.js
import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import AddModal from './AddModal';
import TransactionProduct from './TransactionProduct';

export default function ExpenseTracker() {
  const { transactions } = useExpenses();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBudget = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalBudget - totalExpense;

  const filtered = transactions.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>

      {/* Title */}
      <h1 style={styles.title}>Expense Tracker</h1>

      {/* Balance row */}
      <div style={styles.balanceRow}>
        <span style={styles.balanceText}>
          Balance{' '}
          <span style={{ fontWeight: 'bold' }}>
            ₹{balance}
          </span>
        </span>
        <button style={styles.addBtn} onClick={() => setShowModal(true)}>
          ADD
        </button>
      </div>

      {/* Expense / Budget cards */}
      <div style={styles.cardRow}>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Expense</div>
          <div style={{ ...styles.cardValue, color: '#e53935' }}>₹{totalExpense}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Budget</div>
          <div style={{ ...styles.cardValue, color: '#43a047' }}>₹{totalBudget}</div>
        </div>
      </div>

      {/* Transactions section */}
      <h2 style={styles.sectionTitle}>Transactions</h2>

      {/* Search */}
      <input
        style={styles.searchInput}
        placeholder="Search here"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Transaction list */}
      <div style={styles.list}>
        {filtered.length === 0 ? (
          <p style={styles.empty}>No transactions found.</p>
        ) : (
          filtered.map(t => (
            <TransactionProduct key={t.id} transaction={t} />
          ))
        )}
      </div>

      {/* Add modal */}
      {showModal && <AddModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

const styles = {
  container: {
    background: '#fff',
    borderRadius: 8,
    border: '1px solid #ccc',
    padding: '28px 28px',
    width: '100%',
    maxWidth: 600,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#111',
  },
  balanceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceText: {
    fontSize: 20,
    color: '#111',
  },
  addBtn: {
    background: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '10px 22px',
    fontSize: 15,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  cardRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 24,
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: '14px 18px',
  },
  cardLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111',
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 8,
    border: '1px solid #e0e0e0',
    background: '#f5f5f5',
    fontSize: 15,
    marginBottom: 16,
    outline: 'none',
    color: '#555',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    padding: '20px 0',
    fontSize: 14,
  },
};