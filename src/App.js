import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login'; // Assurez-vous que le fichier Login.jsx est correctement importé
import Signup from './components/signup'; // Assurez-vous que le fichier Signup.jsx est correctement importé

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route principale redirigeant vers la page de connexion */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Page de connexion */}
        <Route path="/login" element={<Login />} />

        {/* Page d'inscription */}
        <Route path="/signup" element={<Signup />} />

        {/* Gestion des routes inexistantes */}
        <Route path="*" element={<h1>404 - Page non trouvée</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
