// utils/auth.js}
import { jwtDecode } from "jwt-decode";

export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const clearToken = () => {
    localStorage.removeItem('token');
  };
  
  export const getRoleFromToken = (token) => {
    const decoded = jwtDecode(token);
    return decoded.role;
  };
  