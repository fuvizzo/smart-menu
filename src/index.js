import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store, persistor } from './Store/index';

import { PersistGate } from 'redux-persist/integration/react';
import { StylesProvider } from '@material-ui/styles';
const skipKeys = [
  'redux-persist localStorage test',
  'firebase:sentinel',
  'persist:publicStore',
];
window.addEventListener('storage', e => {
  if (!skipKeys.some(key => key === e.key)) window.location.href = '/';
});

ReactDOM.render(
  /*  <React.StrictMode> */
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </PersistGate>
  </Provider>,
  /* </React.StrictMode> */ document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
