import React from 'react';
import {Component} from 'react'; 
 import { 
     View, 
     Text, 
     Button,
     Image,
     TouchableHighlight,
     StyleSheet 
 } from 'react-native'; 
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../styles/colors';

 //styles
 import common from '../../../styles/common'; 
 import styles from './style';


 export default class HomeScreen extends Component{ 


     // functions

     /*
        name:  gotoAddScreen
        description: show Add Screen
    */
    gotoAddScreen(){
        this.props.navigation.navigate("Add",{
            itemId: 0 // 일정(0)추가
        });    
    }


    // HomeScreen : 캘린더
     render(){ 
         return ( 
             
            <View style = {styles.container}>
                <View style = {styles.nav}>
                    <Icon name="ios-menu" size={30} color={Colors.gray}></Icon>
                    <Text style={[common.font_title, {color:Colors.gray}]}>년/월</Text>

                    {/* 먼슬리 -> 위클리 전환 */}
                    <Icon name="ios-calendar" size={30} color={Colors.gray}></Icon>

                    {/* 위클리 -> 먼슬리 전환 */}
                    {/* 모듈 업데이트되면서 아이콘 사라짐;; */}
                </View>
                <View style = {styles.content}>
                    <Text>캘린더 모듈 사용하기</Text>
                    <TouchableHighlight style={common.addButton}
                        underlayColor={Colors.clicked} onPress={this.gotoAddScreen.bind(this)}>
                        <Text style={{fontSize: 50, color: 'white'}}>+</Text>
                    </TouchableHighlight>
                </View>
            </View> 
            
           
         ); 
     } 
 } 