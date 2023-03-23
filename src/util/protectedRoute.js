import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import React, { useEffect, useState, useContext } from "react";

export { PrivateRoute };

function PrivateRoute({ children }) {
    const { auth } = useContext(AuthContext);
    console.log('auth', auth);
    if (!auth || (auth && Object.keys(auth).length === 0)) {
        console.log('auth2', auth);
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }
    // authorized so return child components
    return children;

}