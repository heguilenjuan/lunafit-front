/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { getToken, getRoleFromToken } from '../../utils/auth';

const PrivateRoute = ({ component: Component, requiredRole, ...rest }) => {
    console.log(Component)
    const token = getToken();
    const role = token ? getRoleFromToken(token) : null;
    console.log(token, role)
    if (!token) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return <Component {...rest} />;
};

export default PrivateRoute;
