import React from 'react';
import { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Switch,
    Picker,
    TouchableWithoutFeedback
} from 'react-native';
import Modal from 'react-native-modal';
import { DrawerActions } from 'react-navigation-drawer';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MyActionBar from '../MyActionBar'
import ReactNativePickerModule from 'react-native-picker-module';

//styles
import Colors from '../../../styles/colors';
import common from '../../../styles/common';
import styles from './style'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//테마 색상 설정 위한 변수
/* var theme_color = "Colors._10"; */

export default class CustomerSupportScreen extends Component {


    

    state = {
        switchValue: true,
        isModalVisible: false,
        selectedDay: '일요일',
        theme_color: '#2980b9'
    };

    // functions
    onChangeFunction(newState) {
        this.setState(newState);
    }

    /*
        name:  toggleModal
        description: show yearmonthday picker
    */
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    /*
        name:  setThemeColor
        description: set theme color
    */
    setThemeColor(Color) {
        this.state.theme_color = Color;
    }

    // SettingScreen : 캘린더
    render() {

        const { onValueChange } = this;
        const { switchValue } = this.state;
        

        return (
            <View style={styles.container}>

                <MyActionBar title="설정" prev = {this.props} />

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
                                <TouchableOpacity title="Theme" style={[styles.theme_btn, {borderColor:this.state.theme_color}, {backgroundColor:this.state.theme_color}]} onPress={() => { this.toggleModal() }}>
                                </TouchableOpacity>
                                <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => { this.toggleModal() }}>
                                        <View style={styles.modal_container}>
                                            <View style={styles.modalTitle}>
                                                <Text style={[common.font_mid, common.font_bold, common.mb1, {color:Colors.gray}]}>캘린더 테마 설정</Text>
                                            </View>
                                            <View style={styles.modalUp}>
                                                <TouchableOpacity style={[styles.modalTheme, {borderColor:Colors._0}, {backgroundColor:Colors._0}, {left:wp("4%")}]} onPress={() => { this.toggleModal(); this.setThemeColor('#e74c3c') }}/>
                                                <TouchableOpacity style={[styles.modalTheme, {borderColor:Colors._1}, {backgroundColor:Colors._1}, {left:wp("8%")}]} onPress={() => { this.toggleModal(); this.setThemeColor('#e67e22') }}/>
                                                <TouchableOpacity style={[styles.modalTheme, {borderColor:Colors._2}, {backgroundColor:Colors._2}, {left:wp("12%")}]} onPress={() => { this.toggleModal(); this.setThemeColor('#f1c40f') }}/>
                                                <TouchableOpacity style={[styles.modalTheme, {borderColor:Colors._3}, {backgroundColor:Colors._3}, {left:wp("16%")}]} onPress={() => { this.toggleModal(); this.setThemeColor('#f39c12') }}/>
                                                <TouchableOpacity style={[styles.modalTheme, {borderColor:Colors._4}, {backgroundColor:Colors._4}, {left:wp("20%")}]} onPress={() => { this.toggleModal(); this.setThemeColor('#FF8D78') }}/>
                                                <TouchableOpacity style={[styles.modalTheme, {borderColor:Colors._5}, {backgroundColor:Colors._5}, {left:wp("24%")}]} onPress={() => { this.toggleModal(); this.setThemeColor('#fde296') }}/>
                                                
                                            </View>
                                            <View style={styles.modalDown}>
                                            <TouchableOpacity style={[styles.modalTheme, {borderColor:Colors._6}, {backgroundColor:Colors._6}, {left:wp("4%")}]} onPress={() => { this.toggleModal(); this.setThemeColor('#1abc9c') }}/>
                                            <TouchableOpacity style={[styles.modalTheme, {borderColor:Colors._7}, {backgroundColor:Colors._7}, {left:wp("8%")}]} onPress={() => { this.toggleModal(); this.setThemeColor('#2ecc71') }}/>
                                            <TouchableOpacity style={[styles.modalTheme, {borderColor:Colors._8}, {backgroundColor:Colors._8}, {left:wp("12%")}]} onPress={() => { this.toggleModal(); this.setThemeColor('#27ae60') }}/>
                                            <TouchableOpacity style={[styles.modalTheme, {borderColor:Colors._9}, {backgroundColor:Colors._9}, {left:wp("16%")}]} onPress={() => { this.toggleModal(); this.setThemeColor('#3498db') }}/>
                                            <TouchableOpacity style={[styles.modalTheme, {borderColor:Colors._10}, {backgroundColor:Colors._10}, {left:wp("20%")}]} onPress={() => { this.toggleModal(); this.setThemeColor('#2980b9') }}/>
                                            <TouchableOpacity style={[styles.modalTheme, {borderColor:Colors._11}, {backgroundColor:Colors._11}, {left:wp("24%")}]} onPress={() => { this.toggleModal(); this.setThemeColor('#0E2C40') }}/>
                                            </View>  
                                            <View style={styles.modalButton}>
                                                <TouchableOpacity onPress = {() => this.toggleModal()}>
                                                <Text style={[common.font_mid, { color: Colors.darkPrimary }]}>취소</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                </Modal>

                            </View>
                                <View style={[{ flexDirection: 'row', width: '100%' }, common.mb1]}>
                                    <Text style={[common.font_mid, common.font_bold, common.mb1]}>주 시작 요일</Text>

                                    <View style={styles.selectWeek}>
                                        <Picker
                                            title={"주 시작 요일"}
                                            selectedValue={this.state.selectedDay}
                                            style={{ height: 30, width: 110 }}
                                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedDay: itemValue })}
                                        >
                                            <Picker.Item label="일요일" value="일요일" />
                                            <Picker.Item label="월요일" value="월요일" />
                                        </Picker>

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
