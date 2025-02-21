import React, { useEffect, useState } from 'react';
import { getTransactions } from '../services/api';
import TransactionForm from '../components/TransactionForm';
import TransactionsTable from '../components/TransactionsTable';
import { toast, ToastContainer } from 'react-toastify';
import { CircularProgress, Box } from '@mui/material';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await getTransactions();
      console.log("Données reçues :", response);

      if (Array.isArray(response.data)) {
        setTransactions(response.data); // ✅ Prendre `data` au lieu de `response`
      } else {
        throw new Error("Format de données inattendu");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des transactions :", error);
      toast.error('Erreur lors du chargement des transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Liste des Transactions</h2>
      <TransactionForm onTransactionAdded={fetchTransactions} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TransactionsTable transactions={transactions} onDelete={fetchTransactions} />
      )}
      <ToastContainer />
    </div>
  );
};

export default Transactions;
