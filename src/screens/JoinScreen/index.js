import React from 'react';
import {Component} from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

 import { 
     View,
     Image, 
     Text, 
     TextInput, 
     TouchableOpacity, 
     StyleSheet, 
     CheckBox
 } from 'react-native'; 

//style
import common from '../../../styles/common'; 
import styles from './style';

 export default class JoinScreen extends Component{ 
    
    /*
      functions
    */


    /*
        name: join
        description: make new Account
    */
     join(){ 

         // write code about Join
         /*
            회원가입 관련 코드
         */

         // go to LoginScreen
         alert("회원가입이 완료되었습니다");
         this.props.navigation.goBack(); 

     }  


     /*
        Join Screen
     */
     render(){ 
         return ( 
            <View style={styles.container}> 
                 <View style={styles.titleArea}> 
                 {/* 로고 이미지 삽입 */}
                     <Image source = {require('../../../assets/dry-clean.png')} 
                            style={{width:200, height:200}}/>
                </View> 
                 <View style={styles.formArea}> 
                    <TextInput  
                         style={styles.textForm}  
                         placeholder={"닉네임"}/> 
                     <TextInput  
                         style={styles.textForm}  
                         placeholder={"이메일"}/> 
                     <TextInput  
                         style={styles.textForm}  
                         placeholder={"비밀번호"}/> 
                     <View style = {{ flexDirection : 'row', alignItems : 'center', textAlign : 'center' }}>
                        <CheckBox></CheckBox>
                        <Text style={styles.smallText}>
                            <Text style = {common.linkEffect}>개인정보취급방침</Text> 및 
                            <Text style = {common.linkEffect}>이용약관</Text>에 동의하시겠습니까?
                        </Text>    
                     </View>   
                    
                 </View> 
                 
                 <View style={styles.buttonArea}> 
                     <TouchableOpacity  
                         style={[styles.button, styles.blue]} 
                         onPress={this.join.bind(this)}> 
                         <Text style={styles.buttonTitle}>회원가입</Text> 
                     </TouchableOpacity>               
                 </View> 
                 
             </View> 
         ); 
     } 
 } 
 

 