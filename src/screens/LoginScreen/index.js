import React, { useEffect } from 'react';
import {Component} from 'react'; 
// import Amplify, {API} from 'aws-amplify'; // API.get API.post API.put 
import { 
     View,
     Image, 
     Text, 
     TextInput, 
     TouchableOpacity, 
     StyleSheet 
 } from 'react-native'; 
import {getApi, postApi} from '../../common/common'
import common from '../../../styles/common'; // common styles
import styles from './style';


 export default class LoginScreen extends Component{ 
    //functions
    /*
        name: _doLogin
        description: show Login Screen
    */

     _doLogin() { 
     
        //get
        // getApi('membersApi', '/members/login');

        this.props.navigation.navigate('Home'); 
    } 
 
    /*
        name: _doNaverLogin
        description: login with Naver account
    */
    _doNaverLogin(){
        this.props.navigation.navigate('Home'); // 임시로 써놓음. 네이버연동 알아보는 사람이 알아서 만들기,,
    }

     /*
        name: _goJoinScreen
        description: show Join Screen
    */
     _goJoinScreen(){
        this.props.navigation.navigate('Join'); 
     }

    /*
        name: _goFindScreen
        description: show FindInfo Screen
    */
     _goFindScreen(){
         console.log("find find");
        this.props.navigation.navigate('FindInfo'); 
     }

     /*
        Login Screen
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
                         placeholder={"이메일"}/> 
                     <TextInput  
                         style={styles.textForm}  
                         placeholder={"비밀번호"}/> 
                    <Text style={styles.smallText}>비밀번호를 잊어버리셨나요? 
                        <Text 
                            style = {common.linkEffect}
                            onPress = {this._goFindScreen.bind(this)}>
                            비밀번호 찾기</Text>
                    </Text> 
                 </View> 
                 
                 <View style={styles.buttonArea}> 
                     <TouchableOpacity  
                         style={[styles.button, styles.blue]} 
                         onPress={this._doLogin.bind(this)}> 
                         <Text style={styles.buttonTitle}>로그인</Text> 
                     </TouchableOpacity> 
                     <TouchableOpacity  
                         style={[styles.button,styles.green]} > 
                         <Text style={styles.buttonTitle}
                         onPress={this._doNaverLogin.bind(this)}> 
                         네이버 아이디로 로그인</Text> 
                     </TouchableOpacity>
                     <Text style={[styles.smallText, common.mt2_5]}>아직 회원이 아니신가요? 
                         <Text 
                         style = {common.linkEffect}
                         onPress ={this._goJoinScreen.bind(this)}>회원가입</Text>
                     </Text> 
                 </View> 
                 
             </View> 
         ); 
     } 
 } 
 

