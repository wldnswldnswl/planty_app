import React from 'react';
import {Component} from 'react'; 
 import { 
     View,
     Image, 
     Text, 
     TextInput, 
     TouchableOpacity, 
     StyleSheet 
 } from 'react-native'; 
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
 
 
 export default class LoginScreen extends Component{ 
      
     static navigationOptions = { 
         header: null, 
     }; 
 
     _doLogin(){ 
         // do something 
         this.props.navigation.replace('TabNavigator') 
     } 
 

     render(){ 
         return ( 
            <View style={styles.container}> 
                 <View style={styles.titleArea}> 
                 {/* 로고 이미지 삽입 */}
                     <Image source = {require('./dry-clean.png')} 
                            style={{width:200, height:200}}/>
                </View> 
                 <View style={styles.formArea}> 
                     <TextInput  
                         style={styles.textForm}  
                         placeholder={"이메일"}/> 
                     <TextInput  
                         style={styles.textForm}  
                         placeholder={"비밀번호"}/> 
                 </View> 
                 <View style={styles.buttonArea}> 
                     <TouchableOpacity  
                         style={styles.button} 
                         onPress={this._doLogin.bind(this)}> 
                         <Text style={styles.buttonTitle}>로그인</Text> 
                     </TouchableOpacity> 
                 </View> 
             </View> 
         ); 
     } 
 } 
 

 const styles = StyleSheet.create({ 
    container: { 
         flex: 1, 
         backgroundColor: 'white', 
        paddingLeft: wp('10%'), 
         paddingRight: wp('10%'), 
         justifyContent: 'center', 
     }, 
     titleArea: { 
         width: '100%', 
         marginBottom : wp('30%'),
         alignItems: 'center', 
     }, 
     title: { 
         fontSize: wp('10%'), 
     }, 
     formArea: { 
         width: '100%', 
         paddingBottom: wp('10%'), 
     }, 
     textForm: { 
         borderWidth: 0.5, 
         borderColor: '#888', 
         width: '100%', 
         height: hp('6%'), 
         paddingLeft: 5, 
         paddingRight: 5, 
         marginBottom: 5
        }, 
     buttonArea: { 
         width: '100%', 
         height: hp('6%'), 
    }, 
     button: { 
         backgroundColor: "#3498db", 
         width: "100%", 
         height: "100%", 
         justifyContent: 'center', 
         alignItems: 'center', 
     }, 
     buttonTitle: { 
         color: 'white', 
     }, 
 }) 
