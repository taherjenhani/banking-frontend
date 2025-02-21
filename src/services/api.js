import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5002/api/transactions';

export const addTransaction = async (transactionData) => {
  try {
    const response = await axios.post(API_URL, transactionData, {
      headers: { 'Content-Type': 'application/json' },
    });
    toast.success('Transaction ajoutée avec succès !');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la transaction:', error);
    toast.error(error.response ? error.response.data.message : 'Échec de l\'ajout de la transaction.');
    throw error;
  }
};

export const getTransactions = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Réponse API :", response.data); // 🔍 Vérifier le format de la réponse
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des transactions:', error);
      toast.error('Impossible de récupérer les transactions.');
      throw error;
    }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    toast.success('Transaction supprimée avec succès !');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de la transaction:', error);
    toast.error('Impossible de supprimer la transaction.');
    throw error;
  }
};
