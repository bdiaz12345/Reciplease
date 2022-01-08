// library imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider} from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

// functionality imports
import App from './App';
// import { rootReducer } from './store'

// style import
import './index.css'
import 'antd/dist/antd.css'

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
      <Router>
          <App />
      </Router>
  </Provider>,
  document.getElementById('root')
);