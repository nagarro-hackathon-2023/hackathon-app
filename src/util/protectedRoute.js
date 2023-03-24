import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import React, { useContext } from 'react';

export { PrivateRoute };

function PrivateRoute({ children }) {
    const { auth } = useContext(AuthContext);
    const token  = window.localStorage.getItem("token");
    if (!auth || (auth && Object.keys(auth).length === 0)) {
        if (token) {
            // setAuth({ token });
        } else {
            return <Navigate to="/login" />
        }
    }
    // authorized so return child components
    return children;

}