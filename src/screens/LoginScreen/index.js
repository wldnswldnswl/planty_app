import React, { useEffect } from 'react';
import {Component} from 'react'; 
import Amplify, {API} from 'aws-amplify'; // API.get API.post API.put 
import { 
     View,
     Image, 
     Text, 
     TextInput, 
     TouchableOpacity, 
     AsyncStorage
 } from 'react-native'; 
import {getApi, postApi} from '../../common/common'
import common from '../../../styles/common'; // common styles
import styles from './style';


 export default class LoginScreen extends Component{ 
    
    constructor(props){
        super(props);

        this.state = {
            email: null,
            pwd: null,
            nickname: null
        }
    }

    //functions
    /*
        name: _doLogin
        description: show Login Screen
    */
//    _doLogin = async() => 
     async _doLogin(){ 
     
        // alert(JSON.stringify(this.state));
        //get
        //빈 칸 확인
        if(this.state.email == null || this.state.email.trim() == ""||
           this.state.pwd == null || this.state.pwd.trim() == "" ){
               alert("빈 칸을 입력해주세요");
           }
        else{
            const resources = {
               params: {
                    email : this.state.email,
                    pwd: this.state.pwd
                }
              }
            //   alert(JSON.stringify(resources));
             console.log(await API.get('ApiMembers', '/members/login'),resources);
            // const response = API.get('ApiMembers', '/members/login');
            // const response = getApi('ApiMembers', '/members/object', "환영합니다", "아이디/비밀번호를 확인하세요");
            // this.setState('nickname',response.nickname);
            // await AsyncStorage.setItem('userToken', this.state.nickname);
        // alert(JSON.stringify(response));

        // const data = await API.get('membersApi','/members', this.state);

        // if(success != null) alert(success); //성공메시지

        // alert('succeses: ', JSON.stringify(data));

    //  return data;

        // this.props.navigation.navigate('Home'); 
         }    
    } 
 
    /*
        name: _doNaverLogin
        description: login with Naver account
    */
    _doNaverLogin(){
        alert("Ddd");
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
                         placeholder={"이메일"}
                         keyboardType='email-address'
                         onChangeText = { value => this.setState({'email' : value})}
                         /> 
                     <TextInput  
                         style={styles.textForm}  
                         placeholder={"비밀번호"}
                         secureTextEntry={true}
                         onChangeText = { value => this.setState({'pwd' : value})}
                         /> 
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
 

