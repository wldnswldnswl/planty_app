//addscreen-index
import React from 'react';
import { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../styles/colors';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ReactNativePickerModule from 'react-native-picker-module';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import { Calendar } from 'react-native-calendars';
import SelectPicker from 'react-native-form-select-picker';

//styles
import common from '../../../styles/common';
import styles from './style';


//현재 년도 저장
var year = new Date().getFullYear();
//현재 월 저장
var month = new Date().getMonth() + 1;
//현재 일자 저장
var day = new Date().getDay();
// 시간을 저장하는 배열 생성
var hour_arr = new Array();
// 분을 저장하는 배열 생성
var minute_arr = new Array();
// 알람 상태 저장하는 배열 생성
var alarm_arr = new Array();
// 반복 상태 저장하는 배열 생성
var repeat_arr = new Array();
// 색상 상태 저장하는 배열 생성
var color_arr = new Array();


export default class AddScreen extends Component {

    //datepicker 생성자 추가
    constructor(props) {
        super(props);

        selected: undefined
        this.state = {
            isModalVisible: false,
            isVisible: false,
            pickerSelection: 'default',
            selectedValue: null
        }

        for (var i = 0; i < 12; i++) {
            var j = String(i + 1)
            hour_arr.push(j)
        }

        for (var i = 0; i < 60; i++) {
            var j = String(i + 1)
            minute_arr.push(j)
        }
    }

    //alarm select state 설정
    alarm_arr = ["설정안함",
        "5분전",
        "10분전",
        "15분전",
        "30분전",
        "45분전",
        "1시간전"]



    //repeat select state 설정
    repeat_arr = ["반복 안함",
        "매일",
        "매주",
        "매월",
        "매년"]

    onDayPress = (day) => {
        this.setState({ selected: day.dateString });
    }


    // functions

    /*
       name:  gotoHomeScreen
       description: show Home Screen
   */
    gotoHomeScreen() {
        this.props.navigation.navigate("Home");
    }

    /*
        name:  gotoToDoScreen
        description: show ToDo Screen
    */
    gotoToDoScreen() {
        this.props.navigation.navigate("ToDo");
    }

    /*
        name:  toggleModal
        description: show yearmonthday picker
    */
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    /*
     name: sethourarr
     description: set hour array
    */
    /* sethourarr = () => {
        for (var i = 0; i < 12; i++) {
            var j = String(i + 1)
            hour.push(j)
        }
    } */

    /*
     name: setminutearr
     description: set hour array
    */
    /* setminutearr = () => {
     for (var i = 0; i < 60; i++) {
         var j = String(i + 1)
         minute.push(j)
     }
     } */



    // AddScreen: 일정(0), 할일(1) (전달된 파라미터에 따라 다른 view 생성하기!!!)
    render() {
        //  const params = this.props.navigation.state;
        //  const itemId = params ? params.itemId : null;
        return (

            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableHighlight style={[styles.tab_btn, styles.on]}>
                        <Text style={styles.on}>일정</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.tab_btn, styles.off]} onPress={this.gotoToDoScreen.bind(this)}>
                        <Text style={styles.off}>할일</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.mainText}>
                    <TextInput style={[common.font_small, styles.textForm]} placeholder={'일정을 입력하세요'}></TextInput>
                </View>
                <View style={styles.content}>
                    <View style={[styles.content_element, common.mt2]}>
                        <Text style={[common.font_mid, common.font_gray]}>시작일</Text>
                        <TouchableOpacity onPress={() => { this.toggleModal() }}>
                            <Text style={[common.font_mid, common.font_bold]}>{year}년{month}월{day}일 시간</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content_element}>
                        <Text style={[common.font_mid, common.font_gray]}>종료일</Text>
                        <TouchableOpacity onPress={() => { this.toggleModal() }}>
                            <Text style={[common.font_mid, common.font_bold]}>{year}년{month}월{day}일 시간</Text>
                        </TouchableOpacity>
                        {/* <DateTimePicker
                            isVisible={this.state.isVisible}
                            onConfirm={this.handlePicker}
                            onCancel={this.hidePicker} />
                        <DateTimePicker /> */}
                        <Modal isVisible={this.state.isModalVisible} >


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
                                        onDayPress={this.onDayPress}
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
                                    <View Style={styles.modalCnButton}>
                                        <TouchableHighlight onPress={() => { this.toggleModal() }}>
                                            <Text style={[common.font_mid, { color: Colors.darkPrimary }]}>취소</Text>
                                        </TouchableHighlight>
                                    </View>
                                    <View Style={styles.modalSvButton}>
                                        <TouchableHighlight onPress={() => { this.toggleModal() }}>
                                            <Text style={[common.font_mid, { color: Colors.darkPrimary }]}>저장</Text>
                                        </TouchableHighlight>
                                    </View>


                                </View>

                            </View>

                        </Modal>

                    </View>

                    <View style={styles.content_element_sub}>
                        {/* 아이콘 바꿔야 함 */}
                        <MIcon name="file-document-outline" size={30} color={Colors.gray}></MIcon>
                        <TextInput style={[common.font_small, styles.descriptionForm]} placeholder={'설명'}></TextInput>
                    </View>

                    <View style={styles.content_element_sub}>
                        <Icon name="ios-alarm" size={30} color={Colors.gray}></Icon>
                        {/*알람설정 부분*/}
                        <TouchableOpacity /* onPress={() => { this.toggleModal() }} */>
                            <Text style={[common.font_small, common.ml2, { paddingVertical: 1 }]}>알람</Text>
                        </TouchableOpacity>
                        {/* <Modal isVisible={this.state.isModalVisible} >
                            <View style={styles.modalAlarm_Container}>
                                        <View style={styles.modalAR}/>

                            </View>
                        </Modal> */}

                    </View>

                    <View style={styles.content_element_sub}>
                        <Icon name="ios-color-palette" size={30} color={Colors.gray}></Icon>
                        <TouchableOpacity /* onPress={() => { this.toggleModal() }} */>
                            <Text style={[common.font_small, common.ml2, { paddingVertical: 1 }]}>색상</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content_element_sub}>
                        <Icon name="ios-repeat" size={30} color={Colors.gray}></Icon>
                        <TouchableOpacity /* onPress={() => { this.toggleModal() }} */>
                            <Text style={[common.font_small, common.ml2, { paddingVertical: 1 }]}>반복</Text>
                        </TouchableOpacity>
                    </View>





                    <TouchableHighlight style={[common.addButton, { left: 10 }]}
                        underlayColor={Colors.clicked} onPress={this.gotoHomeScreen.bind(this)}>
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