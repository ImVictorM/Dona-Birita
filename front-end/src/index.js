import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import reportWebVitals from './reportWebVitals';
import './styles/main.scss'
import App from './App';
import Provider from './context/Provider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
