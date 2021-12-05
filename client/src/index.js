// library imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// functionality imports
import App from './App';
// import { rootReducer } from './store'

// style import
import './index.css'

ReactDOM.render(
    <Router>
        <App />
    </Router>,
  document.getElementById('root')
);