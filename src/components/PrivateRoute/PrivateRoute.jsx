/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { getToken, getRoleFromToken } from '../../utils/auth';
const PrivateRoute = ({ element: Element, requiredRole, ...rest }) => {
    const token = getToken();
    const role = token ? getRoleFromToken(token) : null;

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return <Element {...rest} />;
};

export default PrivateRoute;
