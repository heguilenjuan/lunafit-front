/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { getToken, getRoleFromToken } from '../../utils/auth';

const PrivateRoute = ({ component: Component, requiredRole, ...rest }) => {
    const token = getToken();
    const role = token ? getRoleFromToken(token).role : null;

    // Redirigir a la página de inicio de sesión si no hay token
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Redirigir a la página de acceso no autorizado si el rol no es el requerido
    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return <Component {...rest} />;
};

export default PrivateRoute;
