import React from 'react';
import { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Switch
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MyActionBar from '../MyActionBar'
import ReactNativePickerModule from 'react-native-picker-module';

//styles
import Colors from '../../../styles/colors';
import common from '../../../styles/common';
import styles from './style'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class CustomerSupportScreen extends Component {

    state = {
        switchValue: true
    };

    // functions
    onChangeFunction(newState) {
        this.setState(newState);
    }


    // HomeScreen : 캘린더
    render() {

        const { onValueChange } = this;
        const { switchValue } = this.state;

        return (
            <View style={styles.container}>

                <MyActionBar title="설정" />

                <View style={styles.content}>
                    <ScrollView>

                        {/* 계정관리  */}
                        <View style={[common.mv2]}>
                            <Text style={[common.font_small, common.mb1, common.font_gray]}>계정관리</Text>
                            <Text style={[common.font_mid, common.font_bold, common.mb1]}>로그아웃</Text>
                            <Text style={[common.font_mid, common.font_bold, common.mb1, { borderBottomWidth: 1, borderBottomColor: Colors.gray, paddingBottom: hp('2%') }]}>회원 탈퇴</Text>
                        </View>

                        {/* 캘린더 설정  */}
                        <View>
                            <Text style={[common.font_small, common.mb1, common.font_gray]}>캘린더 설정</Text>
                            <View style={[{ flexDirection: 'row', width: '100%' }, common.mb1]}>
                                <Text style={[common.font_mid, common.font_bold, common.mb1]}>테마</Text>
                                <TouchableOpacity title="Theme" style={[styles.theme_btn]}></TouchableOpacity>
                            </View>
                            <View style={[{ flexDirection: 'row', width: '100%' }, common.mb1]}>
                                <Text style={[common.font_mid, common.font_bold, common.mb1]}>주 시작 요일</Text>
                                
                                <View style={styles.selectWeek}>
                                <TouchableOpacity title="SelectStartWeek" />
                                        <Text style={[common.font_mid]}>일</Text>
                                        <IonIcon name="ios-arrow-down" size={20} color={Colors.gray} style={common.ml2}></IonIcon>
            
                                    </View>

                            </View>
                            <View style={[{ flexDirection: 'row', width: "100%" }]}>
                                <Text style={[common.font_mid, common.font_bold, common.mb1]}>공휴일 표시</Text>
                                <Switch
                                    onValueChange={(value) => this.onChangeFunction({ switchValue: value })} // 콜백함수
                                    value={this.state.switchValue}
                                    style={styles.theme_toggle}
                                />
                            </View>
                            <Text style={[common.font_mid, common.font_bold, common.mb1, { borderBottomWidth: 1, borderBottomColor: Colors.gray }]}></Text>
                        </View>

                        {/* 제품정보  */}
                        <View style={[common.mv2]}>
                            <Text style={[common.font_small, common.mb1, common.font_gray]}>제품정보</Text>
                            <Text style={[common.font_mid, common.font_bold, common.mb1]}>버전정보</Text>
                            <Text style={[common.font_mid, common.font_bold, common.mb1, { paddingBottom: hp('2%') }]}>공지사항</Text>
                        </View>

                    </ScrollView>
                </View>
            </View>
        );
    }
} 
