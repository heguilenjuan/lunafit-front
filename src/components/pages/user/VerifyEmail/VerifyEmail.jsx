/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from '../../../Spinner/Spinner';
import { fetchData } from '../../../../utils/api';
import { useNavigate } from 'react-router-dom';
import './VerifyEmail.scss'; // Asegúrate de importar el archivo SCSS

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            verifyEmailToken(token);
        }
    }, [location]);

    const verifyEmailToken = async (token) => {
        try {
            const data = await fetchData('api/users/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });

            // Manejo del mensaje de respuesta
            switch (data.message) {
                case 'Correo electrónico verificado correctamente, ahora puedes iniciar sesión':
                    alert(data.message);
                    navigate('/login');
                    break;
                case 'El token es obligatorio':
                case 'Usuario no encontrado':
                case 'El usuario ya está activado':
                    alert(data.error || 'Ocurrió un error al verificar el correo electrónico');
                    break;
                default:
                    alert('Ocurrió un error inesperado');
                    break;
            }
        } catch (error) {
            console.error('Error al verificar el correo:', error);
            alert('Error en la solicitud. Por favor, intente nuevamente.');
        }
    };
    
    return (
        <div className="verify-email-container">
            <h1>Verificando tu correo electrónico...</h1>
            <Spinner className="spinner" />
        </div>
    );
};

export default VerifyEmail;
