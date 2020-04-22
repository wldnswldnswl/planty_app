import React from 'react';
import { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../styles/colors';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import { Calendar } from 'react-native-calendars';

import {getApi, postApi,getDateString} from '../../common/common'
//styles
import common from '../../../styles/common';
import styles from './style';

//현재 년도 저장
var year = new Date().getFullYear();
//현재 월 저장
var month = new Date().getMonth() + 1;
//현재 일자 저장
var date = new Date().getDate();
//현재 요일 저장
var day = new Date().getDay();
//현재 시간 저장
var hour = new Date().getHours();
//현재 분 저장
var minute = new Date().getMinutes();

// 시간을 저장하는 배열 생성
var hour_arr = new Array();
// 분을 저장하는 배열 생성
var minute_arr = new Array();

var final_date;

export default class AddScreen extends Component {


    //datepicker 생성자 추가
    constructor() {
        super()
        this.state = {
            CalendarModalVisible: false,
            ColorModalVisible: false,
            isVisible: false,
            theme_color: '#2980b9',
            apiData:{
                id: null,
                title: null,
                end_date: null,
                description: null,
                color: 0 // View에서 값 받는 설정 아직 안함. 
            }
        }

        //시간배열에 데이터 삽입
        for (var i = 0; i < 12; i++) {
            var j = String(i + 1)
            hour_arr.push(j)
        }

        //분배열에 데이터 삽입
        for (var i = 0; i < 59; i++) {
            var j = String(i + 1)
            minute_arr.push(j)
        }
       
        final_date = getDateString(year, day, month, date, minute, hour);

        // final_date ={year}+"."+{month_len}{month}.{date_len}{date}({ko_day}) {am_pm} {hour_len}{hour}:{minute_len}{minute}
    }

    // functions

    /*
        name:  gotoAddScreen
        description: show Add Screen
    */
    gotoAddScreen() {
        this.props.navigation.navigate("Add");
    }

    /*
        name:  gotoHomeScreen
        description: show Home Screen
    */
    gotoHomeScreen() {
        alert(JSON.stringify(this.state.apiData));
        // postApi('ApiToDoList','/todolist', this.state.apiData, "데이터 넣음","실패");
        // this.props.navigation.navigate("Home");
    }

    /*
        name:  Back
        description: screen back,
    */
    Back() {
        this.props.navigation.goBack();
    }

    /*
        name:  toggleCalendarModal
        description: show Calendar modal
    */
    toggleCalendarModal = () => {
        this.setState({ CalendarModalVisible: !this.state.CalendarModalVisible });
    }

    /*
        name:  toggleColorModal
        description: show color picker
    */
    toggleColorModal = () => {
        this.setState({ ColorModalVisible: !this.state.ColorModalVisible });
    }

    /*
        name:  setThemeColor
        description: set theme color
    */
    setThemeColor(Color) {
        this.state.theme_color = Color;
    }

    /*
        name:  handlePicker
        description: handle datepicker
    */
    /* handlePicker = () => {
        this.setState({
            isVisible: false
        })
    } */

    /*
        name:  showPicker
        description: show datepicker
    */
    /*  showPicker = () => {
         this.setState({
             isVisible: true
         })
     } */

    /*
        name:  hidePicker
        description: hide picker
    */
    /* hidePicker = () => {
        this.setState({
            isVisible: false
        })
    }
 */


    // AddScreen: 일정(0), 할일(1) (전달된 파라미터에 따라 다른 view 생성하기!!!)
    render() {
        //  const params = this.props.navigation.state;
        //  const itemId = params ? params.itemId : null;


        return (

            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableHighlight style={[styles.tab_btn, styles.off]} onPress={this.gotoAddScreen.bind(this)}>
                        <Text style={styles.off}>일정</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.tab_btn, styles.on]} >
                        <Text style={styles.on}>할일</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.mainText}>
                    <TextInput style={[common.font_small, styles.textForm]} 
                               placeholder={'할일을 입력하세요'}
                               onChangeText={(text) => { this.setState({apiData :{title: text}}) }}
                    ></TextInput>
                </View>
                <View style={styles.content}>
                    <View style={[styles.content_element, common.mt2]}>
                        <Text style={[common.font_mid, common.font_gray]}
                              onChangeText={(text) => { this.setState({apiData:{end_date: text}}) }}>
                        완료일</Text>
                        <TouchableOpacity onPress={() => { this.toggleCalendarModal() }}>
                            <Text style={[common.font_mid, common.font_bold]}> {final_date} </Text>
                        </TouchableOpacity>
                    </View>

                    <Modal isVisible={this.state.CalendarModalVisible} onBackdropPress={() => { this.toggleCalendarModal() }}>


                        <View style={styles.modal_container}>
                            <View style={styles.modalheader}>
                            </View>
                            <View style={styles.modalyearmonth}>
                                <TouchableHighlight  >
                                    <Text style={[common.font_title, { color: 'black' }, { fontSize: 30 }]}>{year}년{month}월</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.modalCalendar}>
                                <Calendar
                                    style={styles.calendar}
                                    hideExtraDays
                                    onDayPress={(day) => alert(JSON.stringify(day)) }
                                    markedDates={{
                                        [this.state.selected]: {
                                            selected: true,
                                            disableTouchEvent: true,
                                            selectedDotColor: "orange"
                                        }
                                    }}
                                />

                            </View>
                            <View style={styles.modalHourContainer}>
                                <View style={styles.modalAmPm} >
                                    <ScrollPicker
                                        dataSource={["오전", "오후"]}
                                        selectedIndex={1}
                                        itemHeight={40}
                                        wrapperWidth={110}
                                        wrapperHeight={150}
                                        wrapperBackground={"white"}
                                        highlightColor={Colors.gray}
                                        highlightBorderWidth={1}
                                        activeItemColor={"white"}
                                        itemColor={Colors.darkPrimary}
                                    />

                                </View>
                                <View style={styles.modalHour} >
                                    <ScrollPicker
                                        dataSource={hour_arr}
                                        selectedIndex={5}
                                        itemHeight={40}
                                        wrapperWidth={110}
                                        wrapperHeight={150}
                                        wrapperBackground={"white"}
                                        highlightColor={Colors.gray}
                                        highlightBorderWidth={1}
                                        activeItemColor={"white"}
                                        itemColor={"red"}
                                    />
                                </View>
                                <View style={styles.modalMin} >
                                    <ScrollPicker
                                        dataSource={minute_arr}
                                        selectedIndex={29}
                                        itemHeight={40}
                                        wrapperWidth={110}
                                        wrapperHeight={150}
                                        wrapperBackground={"white"}
                                        highlightColor={Colors.gray}
                                        highlightBorderWidth={1}
                                        activeItemColor={"white"}
                                        itemColor={Colors.darkPrimary}
                                    />
                                </View>
                            </View>
                            <View style={styles.modalButton}>
                                <View style={styles.modalCnButton}>
                                    <TouchableHighlight onPress={() => { this.toggleCalendarModal() }}>
                                        <Text style={[common.font_mid, { color: Colors.darkPrimary }, { marginTop: wp("2%") }]}>취소</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={styles.modalSvButton}>
                                    <TouchableHighlight onPress={() => { this.toggleCalendarModal() }}>
                                        <Text style={[common.font_mid, { color: Colors.darkPrimary }, { marginTop: wp("2%") }]}>저장</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>

                    </Modal>



                    <View style={styles.content_element_sub}>
                        {/* 아이콘 바꿔야 함 */}
                        <MIcon name="file-document-outline" size={30} color={Colors.gray}></MIcon>
                        <TextInput style={[common.font_small, styles.descriptionForm]} 
                                   onChangeText={(text) => { this.setState({apiData: {description: text}}) }}
                                   placeholder={'설명'}></TextInput>
                    </View>

                    <View style={styles.content_element_sub}>
                        <Icon name="ios-color-palette" size={30} color={Colors.gray}></Icon>
                        {/*색상설정 부분*/}
                        <TouchableOpacity title="Theme" 
                        style={[styles.theme_btn, { borderColor: this.state.theme_color }, { backgroundColor: this.state.theme_color }]} onPress={() => { this.toggleColorModal() }}
                        >
                        </TouchableOpacity>
                        <Modal isVisible={this.state.ColorModalVisible} onBackdropPress={() => { this.toggleColorModal() }}>
                            <View style={styles.colormodal_container}>
                                <View style={styles.colorModalTitle}>
                                    <Text style={[common.font_mid, common.font_bold, common.mb1, { color: Colors.gray }]}>할일 색상 설정</Text>
                                </View>
                                <View style={styles.colorModalUp}>
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._0 }, { backgroundColor: Colors._0 }, { left: wp("4%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#e74c3c') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._1 }, { backgroundColor: Colors._1 }, { left: wp("8%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#e67e22') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._2 }, { backgroundColor: Colors._2 }, { left: wp("12%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#f1c40f') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._3 }, { backgroundColor: Colors._3 }, { left: wp("16%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#f39c12') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._4 }, { backgroundColor: Colors._4 }, { left: wp("20%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#FF8D78') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._5 }, { backgroundColor: Colors._5 }, { left: wp("24%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#fde296') }} />

                                </View>
                                <View style={styles.colorModalDown}>
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._6 }, { backgroundColor: Colors._6 }, { left: wp("4%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#1abc9c') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._7 }, { backgroundColor: Colors._7 }, { left: wp("8%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#2ecc71') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._8 }, { backgroundColor: Colors._8 }, { left: wp("12%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#27ae60') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._9 }, { backgroundColor: Colors._9 }, { left: wp("16%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#3498db') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._10 }, { backgroundColor: Colors._10 }, { left: wp("20%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#2980b9') }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._11 }, { backgroundColor: Colors._11 }, { left: wp("24%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor('#0E2C40') }} />
                                </View>
                                <View style={styles.colorModalButton}>
                                    <TouchableOpacity onPress={() => this.toggleColorModal()}>
                                        <Text style={[common.font_mid, { color: Colors.darkPrimary }]}>취소</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>





                    <TouchableHighlight style={[common.addButton, { left: 10 }]}
                        underlayColor={Colors.clicked} onPress={this.Back.bind(this)}>
                        <Text style={{ fontSize: 30, color: 'white' }}>X</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={common.addButton}
                        underlayColor={Colors.clicked} onPress={this.gotoHomeScreen.bind(this)}>
                        <Text style={{ fontSize: 30, color: 'white' }}>V</Text>
                    </TouchableHighlight>
                </View>
            </View>


        );
    }
} 