import { Route, Routes } from 'react-router-dom'
import React from 'react'
import './styles/app.scss'

import Landing from './components/Landing'
import LogIn from './components/LogIn'
import Search from './components/Search'
import SignUp from './components/SignUp'
import ForgotPassword from './components/ForgotPassword'

function App() {
  return (
    <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route path="login" element={<LogIn/>} />
        <Route path="search" element={<Search/>} />
        <Route path="signup" element={<SignUp/>} />
        <Route path="forgot" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;