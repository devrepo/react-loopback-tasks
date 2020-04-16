import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import reset from './css/reset';

import store from './store';
import { Board } from './board';

const GlobalStyle = createGlobalStyle`${reset}`;

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Board boardId="1" />
        </Provider>
        <GlobalStyle />
    </BrowserRouter>,
    document.getElementById('root')
);
