import React, { Component } from 'react'; 
import LoginScreen from './LoginScreen'; 
import JoinScreen from './JoinScreen'; 
import FindInfoScreen from './FindInfoScreen'; 
import ContentsScreen from './CustomerSupportItem/ContentsScreen';
import HomeScreen from './HomeScreen'; 
import ToDoListScreen from './ToDoListScreen';
import ToDoScreen from './ToDoScreen';
import AddScreen from './AddScreen';
import DrawerScreen from './drawer';
import {
    AsyncStorage
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack'; 
import * as Common from '../common/common'; 
import Amplify from 'aws-amplify';
import awsConfig from '../aws-exports';

// about redux-persist
// import { connect } from 'react-redux';
// import { login, logout } from '../common/reducers/status.reducer';
import { Provider } from 'react-redux';
import configureStore from '../common/store';
// import { reducer } from '../common/reducers';

const Stack  = createStackNavigator();
Common.setCalendarConfig(); // react-native-calendars 환경설정
Amplify.configure(awsConfig); // Amplify 환경설정

export default function MyStack() {

    //  const mapStateToProps = (state) => ({

    //     number: state.isLogin.status
      
    //   });

    //   const mapDispatchToProps = (dispatch) => ({

    //     increment: () => dispatch(increment()),
      
    //     decrement: () => dispatch(decrement())
      
    //   });

    //   const Container = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
      const { store, persistor } = configureStore();

    //   console.log("상태: ", persistor);
    return (
        // 화면목록
        <Provider store={store}>
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
                <Stack.Screen name = "ToDo" component={ToDoScreen} /> 

                {/* 4. 고객지원 내용*/}
                {/* <Stack.Screen name="ToDoList" component={ToDoListScreen} /> */}
                <Stack.Screen name="Contents" component={ContentsScreen} />
            </Stack.Navigator>  

            
        </NavigationContainer>
        </Provider>
                       


    )
}

