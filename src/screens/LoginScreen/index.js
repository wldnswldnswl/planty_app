import React, { useEffect } from 'react';
import { Component } from 'react';
import Amplify, { API } from 'aws-amplify'; // API.get API.post API.put 
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { getApi, postApi } from '../../common/common'
import common from '../../../styles/common'; // common styles
import styles from './style';


export default class LoginScreen extends Component {

    constructor(props) {
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
     _doLogin(){ 
     
        // alert(JSON.stringify(this.state));
        //get
        //빈 칸 확인
        if(this.state.email == null || this.state.email.trim() == ""||
           this.state.pwd == null || this.state.pwd.trim() == "" ){
               alert("빈 칸을 입력해주세요");
           }
        else{
            //   alert(JSON.stringify(resources));
            
            //  console.log(JSON.stringify(await API.get('ApiMembers', '/members/login')));
            
            // 세션 설정 (아이디, 닉네임)
            AsyncStorage.multiSet([ // AsyncStorage는 내부 저장소로 세션으로 사용하기에 보안이 부실할 것. 하지만 이메일, 닉네임 같은 비중요정보라 일단 저걸로 구현해놓음...!
                                    // 추후 redis 또는 Redux와 Redux Persist(앱을 종료해도 지속되는 Store)로 구현 //https://medium.com/humanscape-tech/redux-persist-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-2077c9e566d9
                ["email", this.state.email]
                // ,
                // ["nickname", this.state.nickname]
            ]);


            // getSession
            // AsyncStorage.multiGet(['email', 'password']).then((data) => {
            //     let email = data[0][1];
            //     let password = data[1][1];
         
            //     if (email !== null)
            //         //Your logic
            //  });
            
            // const response = API.get('ApiMembers', '/members/login');
            const response = getApi('ApiMembers', '/members/login', "환영합니다", "아이디/비밀번호를 확인하세요");
            // this.setState('nickname',response.nickname);
            // await AsyncStorage.setItem('userToken', this.state.nickname);
            // alert(JSON.stringify(response));

            // const data = await API.get('membersApi','/members', this.state);

            // if(success != null) alert(success); //성공메시지

            // alert('succeses: ', JSON.stringify(data));

            //  return data;

            this.props.navigation.navigate('Home'); 
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
    _goJoinScreen() {
        this.props.navigation.navigate('Join');
    }

    /*
        name: _goFindScreen
        description: show FindInfo Screen
    */
    _goFindScreen() {
        this.props.navigation.navigate('FindInfo');
    }

    /*
       Login Screen
    */
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleArea}>
                    {/* 로고 이미지 삽입 */}
                    <Image source={require('../../../assets/dry-clean.png')}
                        style={{ width: 200, height: 200 }} />
                </View>
                <View style={styles.formArea}>
                    <TextInput
                        style={styles.textForm}
                        placeholder={"이메일"}
                        keyboardType='email-address'
                        onChangeText={value => this.setState({ 'email': value })}
                    />
                    <TextInput
                        style={styles.textForm}
                        placeholder={"비밀번호"}
                        secureTextEntry={true}
                        onChangeText={value => this.setState({ 'pwd': value })}
                    />
                    <Text style={styles.smallText}>비밀번호를 잊어버리셨나요?
                        <Text
                            style={common.linkEffect}
                            onPress={this._goFindScreen.bind(this)}>
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
                        onPress={this._doNaverLogin.bind(this)}
                        style={[styles.button, styles.green]}>
                        <Image source={require('../../../assets/naver_login_green.jpg')}
                            style={{ width: 287, height: 50 }} />
                    </TouchableOpacity>
                    <Text style={[styles.smallText, common.mt2_5]}>아직 회원이 아니신가요?
                         <Text
                            style={common.linkEffect}
                            onPress={this._goJoinScreen.bind(this)}>회원가입</Text>
                    </Text>
                </View>

            </View>
        );
    }
}


