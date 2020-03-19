import React from 'react'; 
 import { 
     Text 
 } from 'react-native'; 
 import { createStackNavigator, createAppContainer } from '@react-navigation/stack'; 
 import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

 
 import LoginScreen from './LoginScreen'; 
 import HomeScreen from './HomeScreen'; 
 import SettingScreen from './SettingScreen'; 
 import SomethingScreen from './SomethingScreen'; 
import { NavigationContainer } from '@react-navigation/native';
 
const Stack = createStackNavigator();

export default function MyStack() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name = "Login" component={LoginScreen} />
        </Stack.Navigator>
    )
}
 
 