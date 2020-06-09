import React from 'react';
import {Component} from 'react'; 
import { 
     View, 
     Text, 
     TouchableHighlight
} from 'react-native'; 

//styles
import common from '../../../styles/common'; 
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../styles/colors';

import { DrawerActions } from 'react-navigation-drawer';
import {Calendar} from 'react-native-calendars';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 

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
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }



    // HomeScreen : 캘린더
     render(){ 
         return ( 
            <View style = {styles.container}>

                <View style = {styles.nav}>
                    <IonIcon name="ios-menu" size={30} color={Colors.gray}
                        onPress={this.gotoSideNav.bind(this)}
                    ></IonIcon>
                    <Text style={[common.font_title, {color:Colors.gray}]}>년/월</Text>

                    {/* 먼슬리 */}
                    <Icon name="calendar-o" size={30} color={Colors.gray}></Icon>

                    {/* 위클리: "calendar" */}
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