import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Bienvenue ${data.username}!`);
        // Rediriger vers une autre page (par ex. Dashboard)
      } else {
        setError(data.message || 'Login échoué. Vérifiez vos informations.');
      }
    } catch (error) {
      setError('Erreur réseau. Réessayez plus tard.');
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Se connecter</button>
      </form>

      <div className="login-links">
        <p>
          <Link to="/signup">S'inscrire</Link>
        </p>
        <p>
          <Link to="/forgot-password">Mot de passe oublié ?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
