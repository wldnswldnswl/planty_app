import React from 'react';
import {Component} from 'react'; 
import { 
     View, 
     Text, 
     ScrollView
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import  Items  from  '../CustomerSupportItem'
import MyActionBar  from  '../MyActionBar'

//styles
import Colors from '../../../styles/colors';
import common from '../../../styles/common'; 
import styles from './style'


 
 export default class CustomerSupportScreen extends Component{ 
     
     // functions

    // 고객지원 화면
     render(){ 
         return ( 
            <View style = {styles.container}>

                <MyActionBar title = "고객 지원"/>

                <View style = {styles.content}>
                    <ScrollView>     
                        <Items title = "캘린더 관련 문의" />
                        <Items title = "할일 관련 문의"/>
                        <Items title = "동기화 관련 문의"/>
                    </ScrollView>
                </View>
            </View>            
         ); 
     } 
 } 
