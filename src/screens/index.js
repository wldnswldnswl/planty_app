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
 import ToDoListScreen from './ToDoListScreen'
 import AddScreen from './AddScreen';
 import SettingScreen from './SettingScreen'; 
 import SomethingScreen from './SomethingScreen'; 
 import * as Common from '../common/common' 

import { NavigationContainer } from '@react-navigation/native';
import { DrawerActions } from 'react-navigation-drawer';

const Stack = createStackNavigator();
Common.setCalendarConfig(); // react-native-calendars 환경설정

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

            {/* 4. 환경설정 */}
            {/* <DrawerActions.Navigator initialRoutName="Setting">
                <DrawerActions.Screen name="ToDoList" component={ToDoListScreen} />
            </DrawerActions.Navigator> */}
        </Stack.Navigator>

    )
}
 