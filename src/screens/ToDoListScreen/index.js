import React from 'react';
import {Component} from 'react'; 
import { 
     View, 
     Text, 
     TouchableHighlight,
     ScrollView
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';

import MyActionBar from  '../MyActionBar';
import ListItem from '../ToDoListItem';
//styles
import common from '../../../styles/common'; 
import styles from './style';
import Colors from '../../../styles/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 

  
 export default class ToDoListScreen extends Component{ 
     
     // functions

     /*
        name:  gotoAddScreen
        description: show Add Screen
    */
    gotoAddScreen(){
        this.props.navigation.navigate("Add", { itemId:1 }); // ** 할일(itemId:1)추가로 이동    
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
        //  const title = this.props.navigation.state.params;
         return ( 
            <View style = {styles.container}>
                <MyActionBar title = "내 할 일"/>
                {/* <View style = {styles.nav}> */}
                    
                {/* </View> */}

                <View style = {styles.content}>
                    <ScrollView>
                        {/* for문으로 모든 데이터 불러오기, ListItem 동적생성 */}
                        <ListItem name = "오픽 공부하기" color = {Colors._3} date = "03.11" seq = "1"/>
                        <ListItem name = "밥먹기" color = {Colors._10} date = "03.12" />
                        <ListItem name = "영양제 먹기" color = {Colors._11} date = "03.13" />
                    </ScrollView>
                    <TouchableHighlight style={[common.addButton]}
                        underlayColor={Colors.clicked} onPress={this.gotoAddScreen.bind(this)}>
                        <Text style={{fontSize: 50, color: 'white'}}>+</Text>
                    </TouchableHighlight>
                </View>
            </View>            
         ); 
     } 
 } 
