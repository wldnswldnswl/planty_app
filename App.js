/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppStack from './src/screens/index';
import AsyncStorage from "react-native";
// import { Provider } from 'react-redux';
// import {createStore, applyMiddleware} from "redux";
// import rootReducer from "./redux/reduces/index";
// import {persiStore, persistReducer } from "redux-persist";
// import {createLogger} from "redux-logger";

// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import configureStore from './src/common/store';

// const { store, persistor } = configureStore();
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['']
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer);
export default function App() {

  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
        <AppStack/>
    //   </PersistGate>
    // </Provider>
   
  //  persistor = {persistor} loading = {null} 
  )
}
