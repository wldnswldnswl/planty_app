import React from 'react';
import {Component} from 'react'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatelessForm, InlineTextInput } from 'react-native-stateless-form';
 import { 
     View,
     Image, 
     Text, 
     TouchableOpacity, 
     CheckBox
 } from 'react-native'; 
import {getApi, postApi} from '../../common/common'
//style
import common from '../../../styles/common'; 
import styles from './style';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import Colors from '../../../styles/colors';

 export default class JoinScreen extends Component{ 
    
    /*
      functions
    */

    constructor(props){
        super(props);

        this.state = {
            nickname: null,
            email: null,
            pwd: null
            // ,
            // checked: 0
        }
    }
    /*
        name: join
        description: make new Account
    */
     join(nameValid, emailValid, passwordValid){ 

         // write code about Join
         /*
            회원가입 관련 코드
         */
        
        //confirm blank 
        if(this.state.email == null || this.state.email.trim() == "" || 
        this.state.nickname == null || this.state.nickname.trim() == "" ||
        this.state.pwd == null || this.state.pwd.trim() == ""){
            alert("빈 칸을 입력해주세요");
        }//else if(this.state.checked == 0){
          //  alert("약관에 동의해주세요");
        //}
        else if(!nameValid || !passwordValid || !emailValid){
            //페이지 고정
        }
        else{
            postApi('ApiMembers','/members',this.state,"환영합니다","회원가입 실패: planty.adm@gmail.com으로 문의해주세요");
            this.props.navigation.goBack(); 
        }
     }  


     /*
        Join Screen
     */
     render(){ 
        const { nickname, email, pwd } = this.state;
        const nameValid = (nickname && nickname.length > 0 && nickname.length <= 10 ? true : false) // 1자 이상 10자 이하
        const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) // 이메일 형식
        const passwordValid = /^[A-Z0-9._%+-]{6,12}$/i.test(pwd) // 6~12자 사이 영어,숫자,특수문자(_%+-)
        
        return ( 
            <View style={styles.container}> 
                 <View style={styles.titleArea}> 
                 {/* 로고 이미지 삽입 */}
                     <Image source = {require('../../../assets/dry-clean.png')} 
                            style={{width:200, height:200}}/>
                </View> 
                 <StatelessForm style={styles.formArea}> 
                    <InlineTextInput
                         label='닉네임'
                         placeholder='닉네임을 입력하세요'
                         style={styles.textForm}
                         labelStyle={{ color: 'dimgray' }}
                         inputStyle={{ color: 'slategray' }}
                         messageStyle={{ color: 'red' }}
                         icon={ <Icon name={'account-circle'} size={18} color={Colors.gray} /> }//'steelblue'
                         validIcon={ <Icon name='check' size={18} color='green' /> }
                         invalidIcon={ <Icon name='clear' size={18} color='red' /> }
                         value={nickname}
                         valid={nameValid}
                         message={nickname && !nameValid ? '10자 이내로 입력하세요': null}
                         onChangeText={(text) => { this.setState({nickname: text}) }}
                         /> 
                     <InlineTextInput  
                        label='이메일'
                        placeholder='xxx@xx.email'
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        style={styles.textForm}
                        labelStyle={{ color: 'dimgray' }}
                        inputStyle={{ color: 'slategray' }}
                        messageStyle={{ color: 'red' }}
                        icon={ <Icon name={'mail-outline'} size={18} color={Colors.gray} /> }
                        validIcon={ <Icon name='check' size={18} color='green' /> }
                        invalidIcon={ <Icon name='clear' size={18} color='red' /> }
                        value={email}
                        valid={emailValid}
                        message={email && !emailValid ? '이메일 형식으로 입력하세요' : null}
                        onChangeText={(text) => { this.setState({email: text}) }}
                         /> 
                     <InlineTextInput  
                            label="비밀번호"
                            placeholder='비밀번호를 입력하세요'
                            autoCorrect={false}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            style={styles.textForm}
                            labelStyle={{ color: 'dimgray' }}
                            inputStyle={{ color: 'slategray' }}
                            messageStyle={{ color: 'red' }}
                            icon={ <Icon name={'vpn-key'} size={18} color={Colors.gray} /> }
                            validIcon={ <Icon name='check' size={18} color='green' /> }
                            invalidIcon={ <Icon name='clear' size={18} color='red' /> }
                            value={pwd}
                            valid={passwordValid}
                            message={pwd && !passwordValid ? '6자~12자 사이 영어,숫자,특수문자(%,_,+,-)를 사용하세요' : null}
                            onChangeText={(text) => { this.setState({pwd: text}) }}
                         /> 
                     <View style = {{ flexDirection : 'row', alignItems : 'center', textAlign : 'center', paddingTop: heightPercentageToDP("5%") }}>
                        <CheckBox 
                            checked = {this.state.checked}
                            onPress = {() => this.setState({checked: !this.state.checked})}
                            onIconPress = {() => this.setState({checked: !this.state.checked})}
                            ></CheckBox>
                        <Text style={styles.smallText}>
                            <Text style = {common.linkEffect}>개인정보취급방침</Text> 및 
                            <Text style = {common.linkEffect}>이용약관</Text>에 동의하시겠습니까?
                        </Text>    
                     </View>   
                    
                     <View style={styles.buttonArea}> 
                        <TouchableOpacity  
                            style={[styles.button, styles.blue]} 
                            onPress={this.join.bind(this,nameValid,emailValid,passwordValid)}> 
                            <Text style={styles.buttonTitle}>회원가입</Text> 
                        </TouchableOpacity>               
                    </View> 
                 </StatelessForm>       
                 
             </View> 
         ); 
     } 
 } 
 
