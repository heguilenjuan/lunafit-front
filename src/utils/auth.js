// utils/auth.js}
import { jwtDecode } from "jwt-decode";

export const setToken = (token) => {
  sessionStorage.setItem('token', token);
};

export const getToken = () => {
  return sessionStorage.getItem('token');
};

export const clearToken = () => {
  sessionStorage.clear('token');
};

export const getRoleFromToken = (token) => {
  const decoded = jwtDecode(token);

  const { role, userId } = decoded;
  return { role, userId };
};

