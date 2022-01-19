import React from 'react';
import { Navigate } from 'react-router-dom';

function AuthRoute({children})  {
    const auth = window.localStorage.getItem('token')
    
    return auth ? children : <Navigate to="/login" />
}

export default AuthRoute