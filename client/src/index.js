import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/reset.css';
import './css/index.css';
import './css/variables.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);