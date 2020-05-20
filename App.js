/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppStack from './src/screens/index';


export default function App() {

  return (
   <AppStack persistor = {persistor} loading = {null} />
  )
}
