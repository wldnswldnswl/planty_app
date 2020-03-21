import React from 'react'; 
 import { 
     Text 
 } from 'react-native'; 
 import { createStackNavigator, createAppContainer } from '@react-navigation/stack'; 
 import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

 import LoginScreen from './LoginScreen'; 
 import JoinScreen from './JoinScreen'; 
 import FindInfoScreen from './FindInfoScreen'; 
 import HomeScreen from './HomeScreen'; 

 import AddScreen from './AddScreen';
 import SettingScreen from './SettingScreen'; 
 import SomethingScreen from './SomethingScreen'; 
import { NavigationContainer } from '@react-navigation/native';
 

const Stack = createStackNavigator();

export default function MyStack() {
    return (
        // 화면목록
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
            {/* 1. 로그인 관련 화면 */}
            <Stack.Screen name = "Login" component={LoginScreen} />
            <Stack.Screen name = "Join" component={JoinScreen} />
            <Stack.Screen name = "FindInfo" component={FindInfoScreen} />

            {/* 2. 캘린더 화면 */}
            <Stack.Screen name = "Home" component={HomeScreen} />
            <Stack.Screen name = "Add" component={AddScreen} />

            {/* 3. 할일 화면 */}

        </Stack.Navigator>

    )
}
 