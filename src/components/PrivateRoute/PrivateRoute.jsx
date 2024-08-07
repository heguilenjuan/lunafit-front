/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { getToken, getRoleFromToken } from '../../utils/auth';

const PrivateRoute = ({ component: Component, requiredRole, ...rest }) => {
    const token = getToken();
    const role = token ? getRoleFromToken(token).role : null;
    if (!token) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return <Component {...rest} />;
};

export default PrivateRoute;
