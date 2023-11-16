import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { firebaseConfig } from './firebase.config.js';
import {store, persistor} from "./redux/store.js";
import { PersistGate } from 'redux-persist/integration/react';
import "slick-carousel/slick/slick.css";
import { app } from './firebase.config.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  
);
