import React from 'react';
import {Component} from 'react'; 
import { getApi, postApi } from '../../common/common'
import { 
     View,
     Image, 
     Text, 
     TextInput, 
     TouchableOpacity, 
     StyleSheet 
} from 'react-native'; 
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import Colors from '../../../styles/colors'
//styles
import common from '../../../styles/common'; 
import styles from './style';


 export default class FindInfoScreen extends Component{ 
    
    /*
      functions
    */
    constructor(props) {
        super(props);

        this.state = {
            email: null
        }
    }

    /*
        name: findPassword
        description: send password to written email
    */
    async findPassword(){ 
         
        if(this.state.email == null || this.state.email.trim() == ""){
               alert("전송받을 이메일을 입력해주세요.");
        }else{

            const response = await getApi('ApiMembers', '/members/getEmail/'+this.state.email);
            if(response[0] != null){
                
                /*
                *  write code about find PW
                */
    
                alert("임시비밀번호가 이메일로 전송되었습니다.");  
                this.props.navigation.goBack();// go to Login Screen
            }else{
                alert("가입된 정보가 없습니다. 회원가입을 해주세요.");
            }
        }
      

     } 


     // FindInfo Screen
     render(){ 
         return ( 
            <View style={styles.container}> 
                 <View style={styles.titleArea}> 
                 {/* 로고 이미지 삽입 */}
                     <Image source = {require('../../../assets/dry-clean.png')} 
                            style={{width:200, height:200}}/>
                </View> 
                <View style={styles.formArea}> 
                    <Text style = {[common.mt2, common.mb2, {fontSize : wp('4%'), color : Colors.gray, textAlign : 'center'}]}>
                        비밀번호를 잊어버리셨나요?
                    </Text>
                    <Text style = {[styles.smallText]}>기존에 가입하신 이메일을 입력하시면</Text>
                    <Text style = {styles.smallText}>비밀번호변경메일을 발송해드립니다. </Text>
                    <TextInput  
                         style={[styles.textForm, common.mt6]}  
                         placeholder={"이메일을 입력하세요"}
                         keyboardType='email-address'
                         onChangeText={value => this.setState({ 'email': value })}
                         /> 
                 </View> 
                 
                 <View style={styles.buttonArea}> 
                     <TouchableOpacity  
                         style={[styles.button, styles.blue]} 
                         onPress={this.findPassword.bind(this)}> 
                         <Text style={styles.buttonTitle}>비밀번호변경 메일받기</Text> 
                     </TouchableOpacity> 
                 </View> 
                 
             </View> 
         ); 
     } 
 } 
 

 
