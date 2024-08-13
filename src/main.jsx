import React from 'react'
import ReactDOM from 'react-dom/client'

//Component APP
import App from './App.jsx';

//Redux
import store from './redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

//Styles
import './index.scss';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
