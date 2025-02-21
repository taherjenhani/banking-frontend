import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { deleteTransaction } from '../services/api';
import { toast } from 'react-toastify';
import { Delete, Visibility } from '@mui/icons-material';  // Icônes pour suppression et vue
import { keyframes } from '@mui/system'; // For animations

// Adding some keyframes for animation effects
const scaleUp = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const TransactionsTable = ({ transactions, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      toast.success('Transaction supprimée');
      onDelete();
    } catch (error) {
      console.error('Erreur lors de la suppression de la transaction :', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        borderRadius: 12,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
        marginTop: 20,
        background: 'linear-gradient(145deg,rgb(182, 165, 201),rgb(245, 206, 194))', // Gradient background for TableContainer
      }}
    >
      <Table>
        <TableHead style={{ backgroundColor: '#3f51b5', color: '#fff', borderRadius: '12px 12px 0 0' }}>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Expéditeur</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Montant</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Type</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction._id} style={{ transition: '0.3s', '&:hover': { backgroundColor: '#f0f0f0' } }}>
                <TableCell>{transaction._id}</TableCell>
                <TableCell>{transaction.sender}</TableCell>
                <TableCell>{transaction.amount}€</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(transaction._id)}
                    title="Supprimer"
                    style={{
                      transition: '0.3s',
                      '&:hover': {
                        backgroundColor: '#ff5e62',
                        transform: 'scale(1.2)', // Added hover scale effect
                        animation: `${scaleUp} 0.3s ease-in-out`,
                      },
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    color="primary"
                    title="Voir les détails"
                    style={{
                      transition: '0.3s',
                      '&:hover': {
                        backgroundColor: '#3f51b5',
                        transform: 'scale(1.2)', // Added hover scale effect
                        animation: `${scaleUp} 0.3s ease-in-out`,
                      },
                    }}
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: 'center', fontStyle: 'italic', color: '#b0b0b0' }}>
                Aucune transaction trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
