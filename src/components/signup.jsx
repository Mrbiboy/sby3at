import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation des styles Bootstrap
import './signup.css'; // Styles personnalisés supplémentaires

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Indicateur de chargement
  const navigate = useNavigate(); // Pour rediriger après une inscription réussie

  // Validation d'e-mail
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Gestion du formulaire d'inscription
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Active le chargement

    // Vérification des mots de passe
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      setIsLoading(false);
      return;
    }

    // Validation de l'e-mail
    if (!validateEmail(email)) {
      setError("L'adresse e-mail n'est pas valide !");
      setIsLoading(false);
      return;
    }

    // Appel API pour l'inscription
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setIsLoading(false); // Désactive le chargement

      if (response.ok) {
        alert('Compte créé avec succès !');
        navigate('/login'); // Redirige vers la page de connexion
      } else {
        setError(data.message || 'Erreur lors de la création du compte.');
      }
    } catch (error) {
      setError('Erreur réseau. Réessayez plus tard.');
      setIsLoading(false); // Désactive le chargement
    }
  };

  // Gestion de l'inscription avec Google
  const handleGoogleSignup = () => {
    window.location.href = '/auth/google'; // Route Flask pour Google OAuth
  };

  // Gestion de l'inscription avec GitHub
  const handleGitHubSignup = () => {
    window.location.href = '/auth/github'; // Route Flask pour GitHub OAuth
  };

  return (
    <div className="signup-container container mt-5">
      <h2 className="text-center mb-4">Créer un compte</h2>

      {/* Boutons pour Google et GitHub */}
      <div className="social-signup d-flex justify-content-center gap-3 mb-4">
        <button className="btn btn-danger" onClick={handleGoogleSignup}>
          <i className="bi bi-google"></i> S'inscrire avec Google
        </button>
        <button className="btn btn-dark" onClick={handleGitHubSignup}>
          <i className="bi bi-github"></i> S'inscrire avec GitHub
        </button>
      </div>

      <p className="text-center">Ou utilisez votre e-mail pour créer un compte :</p>

      {/* Formulaire d'inscription */}
      <form onSubmit={handleSignup} className="signup-form mx-auto" style={{ maxWidth: '400px' }}>
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmez le mot de passe"
            required
          />
        </div>
        {error && <p className="text-danger text-center">{error}</p>}
        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
          {isLoading ? 'Chargement...' : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
