import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import { Provider as ReduxProvider } from 'react-redux';
import { store, persistor } from './Store/index';
import 'reset-css';

import { PersistGate } from 'redux-persist/integration/react';
import {
  StylesProvider,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';

import { CssBaseline } from '@material-ui/core';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

import { InMemoryCache } from 'apollo-cache-inmemory';

const link = createHttpLink({
  uri: process.env.REACT_APP_BACK_END_URL,
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

window.addEventListener('storage', e => {
  if (!e.key) window.location.href = '/';
});
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Rubik',
      'sans-serif'
    ].join(','),
  }
});

const SmartMenoos = () => {
  return (
    /*  <React.StrictMode> */

    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </PersistGate>
    </ReduxProvider>

    /* </React.StrictMode> */
  );
};

ReactDOM.render(<SmartMenoos />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
