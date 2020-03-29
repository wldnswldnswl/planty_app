import React from 'react'; 
import LoginScreen from './LoginScreen'; 
import JoinScreen from './JoinScreen'; 
import FindInfoScreen from './FindInfoScreen'; 
import HomeScreen from './HomeScreen'; 
import ToDoListScreen from './ToDoListScreen'
import AddScreen from './AddScreen';
import DrawerScreen from './drawer';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack'; 
import * as Common from '../common/common'; 


const Stack  = createStackNavigator();
Common.setCalendarConfig(); // react-native-calendars 환경설정

export default function MyStack() {
    return (

        // 화면목록
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}> 
                {/* 1. 로그인 관련 화면 */}
                <Stack.Screen name = "Login" component={LoginScreen} />
                <Stack.Screen name = "Join" component={JoinScreen} />
                <Stack.Screen name = "FindInfo" component={FindInfoScreen} />

                {/* 2. 캘린더 화면 */}
                <Stack.Screen name = "Home" component={DrawerScreen} /> 
                <Stack.Screen name = "Add" component={AddScreen} /> 

                {/* 3. 할일 화면 */}

                {/* 4. 환경설정 메뉴바 */}
                {/* <Stack.Screen name="ToDoList" component={ToDoListScreen} /> */}
                {/* <Drawer.Screen name="Temp" component={TempScreen} /> */}
            </Stack.Navigator>  

            
        </NavigationContainer>
                       


    )
}

