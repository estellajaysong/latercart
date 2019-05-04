import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './BasicRouter';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#E1B8B1',
      main: '#653C53',
      dark: '#122434',
      contrastText: '#F0C951',
    },
    secondary: {
      light: '#E1B8B1',
      main: '#FB552F',
      dark: '#122434',
      contrastText: '#F0C951',
    },
  },
});

ReactDOM.render(<MuiThemeProvider theme = { theme }>
  <App />
</MuiThemeProvider>,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
