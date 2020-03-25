/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppStack from './src/screens/index';
import Amplify from 'aws-amplify';
import amplify from './aws-exports';

import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  Amplify.configure(amplify);
  return (
      <AppStack />
  )
}
