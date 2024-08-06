import { useState } from 'react';
import { fetchData } from '../../../../utils/api';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [mail, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetchData('api/users/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ mail }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccessMessage('Te hemos enviado un enlace para restablecer la contraseña.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error al enviar el enlace de restablecimiento de contraseña.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="title">Olvidé mi Contraseña</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <input
          type="email"
          placeholder="Ingresa tu correo electrónico"
          value={mail}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">Enviar Enlace</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default ForgotPassword;
