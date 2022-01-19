import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AuthRoute from './components/AuthRoute';
import Landing from './components/Landing';
import LogIn from './components/LogIn';
import Search from './components/Search';
import SignUp from './components/SignUp';
import Cookbook from './components/Cookbook';

import './styles/app.scss';

function App() {
  return (
    <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route path="login" element={<LogIn/>} />
        <Route path="signup" element={<SignUp/>} />
        <Route path="forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />

        <Route 
          path="search" 
          element={
            <AuthRoute>
              <Search />
            </AuthRoute>} />
        <Route 
          path="cookbook" 
          element={
            <AuthRoute>
              <Cookbook/>
            </AuthRoute>
            } />
    </Routes>
  );
}

export default App;