import { Route, Routes } from 'react-router-dom'
import React from 'react'
import './styles/app.scss'

import Landing from './components/Landing'
import LogIn from './components/LogIn'

function App() {
  return (
    <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route path="login" element={<LogIn/>} />
    </Routes>
  );
}

export default App;