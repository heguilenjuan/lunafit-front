/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { getToken } from '../../utils/auth';

const PublicRoute = ({ element: Component }) => {
    const token = getToken();

    if (token) {
        return <Navigate to="/" />;
    }

    return Component;
};

export default PublicRoute;
