import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import reducer from "./REDUX/reducers/index"

const store = createStore(reducer, compose(applyMiddleware(thunk)))

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
