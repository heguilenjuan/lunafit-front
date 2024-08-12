import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchData } from '../../../../utils/api';
import './ResetPassword.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); // Usar useLocation para acceder a la URL

    const [token, setToken] = useState('');

    useEffect(() => {
        // Extraer el token de los parámetros de consulta
        const queryParams = new URLSearchParams(location.search);
        const tokenFromQuery = queryParams.get('token');
        setToken(tokenFromQuery);
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            await fetchData('api/users/reset-password', {
                method: 'POST',
                body: JSON.stringify({ password, token }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSuccessMessage('Contraseña restablecida con éxito. Redirigiendo a la página de inicio de sesión...');
            setErrorMessage('');

            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setErrorMessage('Error al restablecer la contraseña.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="reset-password-container">
            <h2 className="reset-password-title">Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit} className="reset-password-form">
                <input
                    type="password"
                    placeholder="Nueva Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="reset-password-input"
                />
                <input
                    type="password"
                    placeholder="Confirmar Nueva Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="reset-password-input"
                />
                <button type="submit" className="reset-password-button">Restablecer Contraseña</button>
            </form>
            {errorMessage && <div className="reset-password-error">{errorMessage}</div>}
            {successMessage && <div className="reset-password-success">{successMessage}</div>}
        </div>
    );
};

export default ResetPassword;
