import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './style/GlobalStyles';
import Responsive from './style/Responsive';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Responsive>
        <GlobalStyles />
        <App />
      </Responsive>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
