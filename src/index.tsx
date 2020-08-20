import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import './styles.css'
import App from './App';
import theme from './theme';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Router>
            <CssBaseline/>
            <App/>
        </Router>
    </ThemeProvider>,
    document.querySelector('#root'),
);
