import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Wallet from './pages/Wallet';
import Login from './pages/Login';

function App() {
  return (
    <main>
      <h1>Hello, TrybeWallet!</h1>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/carteira" element={ <Wallet /> } />
      </Routes>
    </main>
  );
}

export default App;
