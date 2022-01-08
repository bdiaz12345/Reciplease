import { Route, Routes } from 'react-router-dom'
import React from 'react'
import './styles/app.scss'

import Landing from './components/Landing'
import LogIn from './components/LogIn'
import Search from './components/Search'
import SignUp from './components/SignUp'
import Cookbook from './components/Cookbook'

function App() {
  return (
    <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route path="login" element={<LogIn/>} />
        <Route path="search" element={<Search/>} />
        <Route path="cookbook" element={<Cookbook/>} />
        <Route path="signup" element={<SignUp/>} />
    </Routes>
  );
}

export default App;