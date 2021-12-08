import { Route, Routes } from 'react-router-dom'
import React from 'react'
import './styles/app.scss'

import Landing from './components/Landing'
import LogIn from './components/LogIn'
import Search from './components/Search'

function App() {
  return (
    <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route path="login" element={<LogIn/>} />
        <Route path="search" element={<Search/>} />
    </Routes>
  );
}

export default App;