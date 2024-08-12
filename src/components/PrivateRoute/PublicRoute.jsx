/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { getToken } from '../../utils/auth';

const PublicRoute = ({ component: Component, ...rest }) => {
    const token = getToken();

    // Redirigir a la página de inicio si el token existe
    if (token) {
        return <Navigate to="/cart" />;
    }

    return <Component {...rest} />;
};

export default PublicRoute;
