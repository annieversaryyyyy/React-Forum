import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "./history";
import {ThemeProvider} from "@mui/material";
import postsReducer from "./store/reducers/postReducers";
import usersReducer from "./store/reducers/userReducers";
import theme from "./theme";
import './index.css';
import commentReducer from "./store/reducers/commentReducers";

const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.error(e);
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');

        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    posts: postsReducer,
    users: usersReducer,
    comments: commentReducer,
});

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveToLocalStorage({
        users:store.getState().users,
    });
});


const app = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <App/>
            </Router>
        </ThemeProvider>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);