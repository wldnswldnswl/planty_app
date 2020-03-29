import React from 'react';
import {Component} from 'react'; 
import { 
     View, 
     Text, 
     Button,
     Image,
     TouchableHighlight
} from 'react-native'; 

//styles
import common from '../../../styles/common'; 
import styles from './style';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../styles/colors';

import { createStackNavigator } from '@react-navigation/drawer';
import { DrawerActions } from 'react-navigation-drawer';

import Drawer from '../drawer';

 export default class HomeScreen extends Component{ 
     
    constructor(props) {
        super(props);
        
        this.state = {
          selected: undefined
        };

      }
    
      onDayPress = (day) => {
        this.setState({selected: day.dateString});
      }
    

     // functions

     /*
        name:  gotoAddScreen
        description: show Add Screen
    */
    gotoAddScreen(){
        this.props.navigation.navigate("Add");    
    }

     /*
        name:  gotoSideNav
        description: show Setting Nav
    */
    gotoSideNav(){
        this.props.navigation.toggleDrawer();
    }



    // HomeScreen : 캘린더
     render(){ 
         return ( 
            <View style = {styles.container}>
                <View style = {styles.nav}>
                    <Icon name="ios-menu" size={30} color={Colors.gray}
                        onPress={this.gotoSideNav.bind(this)}
                    ></Icon>
                    <Text style={[common.font_title, {color:Colors.gray}]}>년/월</Text>

                    {/* 먼슬리 -> 위클리 전환 */}
                    <Icon name="ios-calendar" size={30} color={Colors.gray}></Icon>

                    {/* 위클리 -> 먼슬리 전환 */}
                    {/* 모듈 업데이트되면서 아이콘 사라짐;; */}
                </View>
                <View style = {styles.content}>
                    <Calendar
                        style={styles.calendar}
                        hideExtraDays
                        onDayPress={this.onDayPress}
                        markedDates={{
                            [this.state.selected]: {
                            selected: true, 
                            disableTouchEvent: true, 
                            selectedDotColor: 'orange'
                            }
                        }}
                    />
                    <TouchableHighlight style={common.addButton}
                        underlayColor={Colors.clicked} onPress={this.gotoAddScreen.bind(this)}>
                        <Text style={{fontSize: 50, color: 'white'}}>+</Text>
                    </TouchableHighlight>
                </View>
            </View>            
         ); 
     } 
 } 