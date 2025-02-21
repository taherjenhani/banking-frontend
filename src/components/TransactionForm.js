import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Grid, Snackbar, CircularProgress } from '@mui/material';
import { addTransaction } from '../services/api';
import { toast } from 'react-toastify';
import { Send } from '@mui/icons-material';  // Icône de l'envoi
import { keyframes } from '@mui/system'; // For animations

const bounce = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const TransactionForm = ({ onTransactionAdded }) => {
  const [transaction, setTransaction] = useState({
    sender: '',
    accountNumber: '',
    receiver: '',
    type: '',
    amount: '',
    description: '',
  });

  const [loading, setLoading] = useState(false); // Ajout de l'état de chargement
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar pour succès

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Lancement du chargement
    try {
      await addTransaction(transaction);
      toast.success('Transaction ajoutée avec succès');
      onTransactionAdded();
      setTransaction({
        sender: '',
        accountNumber: '',
        receiver: '',
        type: '',
        amount: '',
        description: '',
      });
      setOpenSnackbar(true); // Affichage du snackbar
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la transaction :', error);
      toast.error('Erreur lors de l\'ajout');
    } finally {
      setLoading(false); // Arrêt du chargement
    }
  };

  return (
    <Paper
      style={{
        padding: 20,
        borderRadius: 12,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg,rgb(199, 186, 150), #ff5e62)', // Gradient background
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        align="center"
        style={{
          fontWeight: 'bold',
          color: 'white',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        Nouvelle Transaction
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {['sender', 'accountNumber', 'receiver', 'type', 'amount', 'description'].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={transaction[field]}
                variant="outlined"
                required
                style={{
                  transition: '0.3s',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                  '& .MuiOutlinedInput-root': { borderRadius: '10px' },
                }}
                InputLabelProps={{
                  style: {
                    transition: '0.3s',
                    fontWeight: 'bold',
                    color: '#f8b400',
                  },
                }}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              endIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Send />
                )
              }
              style={{
                textTransform: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 'bold',
                backgroundColor: '#f8b400',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                animation: `${loading ? '' : bounce} 0.5s ease-in-out`, // Animation on button press
                '&:hover': {
                  backgroundColor: '#ff5e62',
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                },
              }}
            >
              {loading ? 'Ajout en cours' : 'Ajouter Transaction'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Transaction ajoutée avec succès"
        style={{
          backgroundColor: '#4caf50',
          borderRadius: '8px',
        }}
      />
    </Paper>
  );
};

export default TransactionForm;
