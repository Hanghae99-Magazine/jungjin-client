import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './style/GlobalStyles';
import Responsive from './style/Responsive';

ReactDOM.render(
  <React.StrictMode>
    <Responsive>
      <GlobalStyles />
      <App />
    </Responsive>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
