import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import { createStore } from 'redux';
import {Provider} from 'react-redux'
import reducer from './Reducers'
import middleWare from './middleware'

const store = createStore(reducer,middleWare)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
