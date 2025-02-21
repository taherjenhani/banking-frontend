import React from 'react';
import Transactions from './pages/Transactions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Transactions />
    </div>
  );
}

export default App;
