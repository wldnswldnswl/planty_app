//addscreen-index
import React from 'react';
import { Component, useState } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    TouchableHighlight,
    Picker,
    TouchableOpacity,
    AsyncStorage,
    RefreshControlBase,
    RefreshControlComponent,
    RefreshControl
} from 'react-native';
import XDate from 'xdate';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../styles/colors';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ReactNativePickerModule from 'react-native-picker-module';
/* import { TouchableOpacity } from 'react-native-gesture-handler'; */
import ScrollPicker, { scrollToIndex } from 'react-native-wheel-scroll-picker';
import { Calendar } from 'react-native-calendars';

import { getApi, postApi, getDateString, getColor, change_month } from '../../common/common'

//styles
import common from '../../../styles/common';
import styles from './style';
import { RotationGestureHandler } from 'react-native-gesture-handler';
import { API } from 'aws-amplify';

// 시간을 저장하는 배열 생성
var hour_arr = new Array();
// 분을 저장하는 배열 생성
var minute_arr = new Array();

//현재 년도/월/일자/요일/시간 저장
var year, month, date, day, hour, minute;
// var am_pm, am_pm_i;

// 출력값 계산 결과
var result = {
    final_date: null,//최종 날짜
    am_pm: null,
    am_pm_i: null
}

export default class AddScreen extends Component {

    //datepicker 생성자 추가
    constructor(props) {
        super(props);
        this.sp_am_pm = React.createRef();

        selected: undefined;
        this.state = {
            isNew: this.props.route.params.isNew,
            uuid: this.props.route.params.uuid,
            StartCalendarModalVisible: false,
            EndCalendarModalVisible: false,
            ColorModalVisible: false,
            isVisible: false,
            final_date: null,
            Calendarheader_month: props.current ? parseDate(props.current) : XDate(),

            // put params start
            email: null,
            title: null,
            start_date: null,
            end_date: null,
            description: "",
            alarm: 0,
            repeat: 0,
            color: 0,
            // put params end

            seleceted: null
        }

    }

    componentWillMount = async () => {

        // 1) 새로 추가
        if (this.state.isNew) {

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

            this.getCurrentDate();
        }

    }

    componentDidMount = async () => {
        //getSession
        await AsyncStorage.getItem("email", (errs, result) => {
            if (!errs) {
                if (result !== null) {
                    this.setState({ "email": JSON.parse(result) });
                }
            }
        });

        // 2) 기존 데이터 수정 
        if (!this.state.isNew) {
            this.getSelectedInfo();
        }
    }

    // functions

    /*
       name:  gotoHomeScreen
       description: show Home Screen
   */
    async gotoHomeScreen() {

        const params = {
            email: this.state.email,
            title: this.state.title,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            description: this.state.description,
            color: this.state.color,
            alarm: this.state.alarm,
            repeat: this.state.repeat
        }

        if (params.title != null && params.title.trim() != "") {
            await postApi('ApiCalendar', '/calendar', params);

            if(!this.state.isNew) {
                params['uuid'] = this.state.uuid;
                const data = await API.del("ApiCalendar","/calendar/object/"+this.state.email+"/"+this.state.uuid).then(response => {

                // 달력 초기화 필요
                  }).catch(error => {
                    console.log("error",error.response);
                  });
            }
            this.props.navigation.navigate("Home", {list_chg: true});
        } else {
            alert("일정을 입력하세요"); // 나중에 비동기 이용해 빨간글씨로 바꾸기
        }
    }

    /*
        name:  gotoToDoScreen
        description: show ToDo Screen
    */
    gotoToDoScreen = () => {
        const { route } = this.props;
        this.props.navigation.navigate("ToDo", {
            isNew: this.state.isNew,
            year: route.params.year,
            month: route.params.month,
            date: route.params.date,
            day: route.params.day,
            calendarheader_month: this.state.Calendarheader_month
        });
    }

    /*
        name:  Back
        description: screen back,
    */
    Back() {
        // this.props.navigation.goBack(); // 로 하면 스택에 쌓인 할일/일정 페이지들이 나옴
        this.props.navigation.navigate("Home", {screen: "Home", params: {list_chg: false}});
    }

    /*
       name:  toggleStartCalendarModal
       description: show Calendar modal (for start date)
   */
    toggleStartCalendarModal = () => {
        /*    if (flag == 'fresh') this.getCurrentDate();  */// 현재 날짜로 초기화
        // else if(flag == "start_date")
        //     this.state.start_date = 
        // else if(flag == 'save'){
        //     this.setState({final_date: text})
        // }

        this.setState({ StartCalendarModalVisible: !this.state.StartCalendarModalVisible });
    }

    /*
      name:  toggleEndCalendarModal
      description: show Calendar modal (for end date)
    */
    toggleEndCalendarModal = () => {
        /* if (flag == 'fresh') this.getCurrentDate(); */ // 현재 날짜로 초기화
        // else if(flag == "start_date")
        //     this.state.start_date = 
        // else if(flag == 'save'){
        //     this.setState({final_date: text})
        // }

        this.setState({ EndCalendarModalVisible: !this.state.EndCalendarModalVisible });
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
        this.state.color = Color;
    }

    setCalDate(cal_year, cal_month, cal_date, cal_day) {
        year = cal_year;
        month = cal_month;
        date = cal_date;
        day = cal_day;
    }

    /*
    * @name: getCurrentDate
    * @description: 현재 날짜,시간으로 변수 초기화
    * @params: 
    * @history: 이지운
    */
    getCurrentDate = () => {
        //현재 년도 저장
        year = new Date().getFullYear();
        //현재 월 저장
        month = new Date().getMonth() + 1;
        //현재 일자 저장
        date = new Date().getDate();
        //현재 요일 저장
        day = new Date().getDay();
        //현재 시간 저장
        hour = new Date().getHours();
        //현재 분 저장
        minute = new Date().getMinutes();

        const { route } = this.props;

        // 현재 출력날짜 저장
        result = getDateString(route.params.year, route.params.day, route.params.month, route.params.date, hour, minute, null);

        this.state.Calendarheader_month = route.params.calendarheader_month;
        this.final_date = result.final_date; // 출력날짜 상태 변경
        // this.setState({final_date : result.final_date}); 
        this.state.end_date = result.final_date;
        this.state.start_date = result.final_date;
        result.am_pm == '오전' ? result.am_pm_i = 0 : 1;

        // this.sp_am_pm.scrollToIndex(result.am_pm_i);
        // console.log(result.final_date);
        // console.log("i: ",result.am_pm_i);
    }

    getSelectedInfo = async () => {
        // 기존 할일 불러오기
        const path_calendarlist = "/calendar/getModifyData/" + this.state.email + "/" + this.state.uuid;
        const response_calendarlist = (await getApi("ApiCalendar", path_calendarlist))[0];

        // 기존 내용으로 변수 갱신
        this.setState({ "start_date": response_calendarlist.start_date });
        this.setState({ "end_date": response_calendarlist.end_date });
        result.final_date = response_calendarlist.start_date;
        result.am_pm == '오전' ? result.am_pm_i = 0 : 1;

        this.setState({ "title": response_calendarlist.title })
        if (this.state.description != null) this.setState({ "description": response_calendarlist.description });
        this.setState({ "alarm": response_calendarlist.alarm });
        this.setState({ "color": response_calendarlist.color });
        this.setState({ "repeat": response_calendarlist.repeat });
        console.log("R: ", response_calendarlist);
    }

    deleteThisCalendar = async () => {
        const data = await API.del("ApiCalendar","/calendar/object/"+this.state.email+"/"+this.state.uuid).then(response => {
            // 달력 초기화 필요
            this.props.navigation.navigate("Home", {screen: "Home", params: {list_chg: true}});
          }).catch(error => {
            console.log("error",error.response);
          });
       console.log(data);    
    }


    /*
        name:  changeYearMonth
        description: change year, month of header, calendar modal
    */
    changeYearMonth = (calendar) => {
        this.setState({ Calendarheader_month: calendar });
        this.setState({ year: calendar.toString('yyyy') });
        this.setState({ month: change_month(calendar.toString('MM')) });
        console.log(calendar);

    }


    onDayPress = (day) => {
        this.setState({ selected: day.dateString });
    }

    // AddScreen: 일정(0), 할일(1) (전달된 파라미터에 따라 다른 view 생성하기!!!)
    render() {
        //  const params = this.props.navigation.state;
        //  const itemId = params ? params.itemId : null;
        const { onValueChange } = this;
        const isLoggedIn = !this.state.isNew;
        let deleteBtn = null;
        let todoBtn = null;

        // View 동적 생성(삭제버튼, 캘린더 수정 시 캘린더 버튼만 띄우기)
        if (isLoggedIn) {
            deleteBtn = <TouchableOpacity style={[styles.delete_btn]} onPress={this.deleteThisCalendar.bind(this)}>
                <Text style={styles.off}>삭제</Text>
            </TouchableOpacity>;
            todoBtn = null;
        } else {
            todoBtn = <TouchableOpacity style={[styles.tab_btn, styles.off]} onPress={this.gotoToDoScreen.bind(this)}>
                <Text style={styles.off}>할일</Text>
            </TouchableOpacity>;
            deleteBtn = null;
        }

        return (

            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableOpacity style={[styles.tab_btn, styles.on]}>
                        <Text style={styles.on}>일정</Text>
                    </TouchableOpacity>
                    <View isLoggedIn={isLoggedIn}>{todoBtn}</View>
                    <View isLoggedIn={isLoggedIn}>{deleteBtn}</View>
                </View>

                <View style={styles.mainText}>
                    <TextInput style={[common.font_small, styles.textForm]} placeholder={'일정을 입력하세요'}
                        onChangeText={(text) => { this.setState({ title: text }) }}
                        value={this.state.title}
                    ></TextInput>
                </View>
                <View style={styles.content}>
                    <View style={[styles.content_element, common.mt2]}>
                        <Text style={[common.font_mid, common.font_gray]}>시작일</Text>
                        <TouchableOpacity onPress={() => { this.toggleStartCalendarModal() }}>
                            <Text style={[common.font_mid, common.font_bold]}>{this.state.start_date}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content_element}>
                        <Text style={[common.font_mid, common.font_gray]}>종료일</Text>
                        <TouchableOpacity onPress={() => { this.toggleEndCalendarModal() }}>
                            <Text style={[common.font_mid, common.font_bold]}>{this.state.end_date}</Text>
                        </TouchableOpacity>

                        {/* select start date Modal -- start -- */}
                        <Modal isVisible={this.state.StartCalendarModalVisible} onBackdropPress={() => { this.toggleStartCalendarModal() }}>
                            <View style={styles.modal_container}>
                                <View style={styles.modalheader}>
                                </View>
                                <View style={styles.modalCalendar}>
                                    <Calendar
                                        style={styles.calendar}
                                        onDayPress={this.onDayPress}
                                        markedDates={{
                                            [this.state.selected]: {
                                                selected: true,
                                                disableTouchEvent: true,
                                                selectedDotColor: "orange"
                                            }
                                        }}
                                        theme={{
                                            textSectionTitleColor: Colors.darkgray,
                                            selectedDayBackgroundColor: Colors.lightgray,
                                            selectedDayTextColor: "black",
                                            todayTextColor: Colors.darkPrimary,
                                        }}
                                        calendarFlag={3}
                                        Calendarheader_month={this.state.Calendarheader_month}
                                        setCalDate={this.setCalDate}
                                        changeYearMonth={this.changeYearMonth}
                                    />

                                </View>
                                <View style={styles.modalHourContainer}>
                                    <View style={styles.modalAmPm} >
                                        <ScrollPicker
                                            ref={(sp_am_pm) => { this.sp_am_pm = sp_am_pm }}
                                            dataSource={['오전', '오후']}
                                            /* selectedItem={result.am_pm} // 첫번째 인덱스는 무조건 선택 안됨.(시간, 분도 마찬가지) */
                                            selectedIndex={1}
                                            itemHeight={40}
                                            wrapperWidth={110}
                                            wrapperHeight={150}
                                            wrapperBackground={"white"}
                                            highlightColor={Colors.gray}
                                            highlightBorderWidth={1}
                                            activeItemColor={"white"}
                                            onValueChange={(data, selectedIndex) => {
                                                /* this.sp.scrollToIndex(result.am_pm_i); */
                                                result.am_pm = data;
                                                result.am_pm_i = selectedIndex;
                                                alert(result.am_pm);
                                            }}
                                            itemColor={Colors.darkPrimary}
                                        />
                                    </View>
                                    <View style={styles.modalHour} >
                                        <ScrollPicker
                                            dataSource={hour_arr}
                                            selectedIndex={hour - 1}
                                            itemHeight={40}
                                            wrapperWidth={110}
                                            wrapperHeight={150}
                                            wrapperBackground={"white"}
                                            highlightColor={Colors.gray}
                                            highlightBorderWidth={1}
                                            activeItemColor={"white"}
                                            onValueChange={(data, selectedIndex) => {
                                                hour = data;
                                            }}
                                            itemColor={"red"}
                                        />
                                    </View>
                                    <View style={styles.modalMin} >
                                        <ScrollPicker
                                            dataSource={minute_arr}
                                            selectedIndex={minute - 1}
                                            itemHeight={40}
                                            wrapperWidth={110}
                                            wrapperHeight={150}
                                            wrapperBackground={"white"}
                                            highlightColor={Colors.gray}
                                            highlightBorderWidth={1}
                                            activeItemColor={"white"}
                                            onValueChange={(data, selectedIndex) => {
                                                minute = data;
                                            }}
                                            itemColor={Colors.darkPrimary}
                                        />
                                    </View>
                                </View>
                                <View style={styles.modalButton}>
                                    <View style={styles.modalCnButton}>
                                        <TouchableHighlight onPress={() => { this.toggleStartCalendarModal() }}>
                                            <Text style={[common.font_mid, { color: Colors.darkPrimary }, { marginTop: wp("2%") }]}>취소</Text>
                                        </TouchableHighlight>
                                    </View>
                                    <View style={styles.modalSvButton}>
                                        <TouchableHighlight onPress={() => {
                                            result = getDateString(year, day, month, date, hour, minute, result.am_pm);
                                            this.setState({ final_date: result.final_date });
                                            this.setState({ start_date: result.final_date })
                                            this.toggleStartCalendarModal()
                                        }}>
                                            <Text style={[common.font_mid, { color: Colors.darkPrimary }, { marginTop: wp("2%") }]} >저장</Text>
                                            {/* 변수 확인용:  onPress = {(e) => {alert("최종: "+year+"년"+month+ "월"+date+"일"+day+ "요일"+ hour+ "시"+ minute+ "분"+ result.am_pm)}}  */}
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>

                        </Modal>
                        {/* select start date Modal -- end -- */}

                        {/* select end date Modal -- start -- */}
                        <Modal isVisible={this.state.EndCalendarModalVisible} onBackdropPress={() => { this.toggleEndCalendarModal('fresh') }}>
                            <View style={styles.modal_container}>
                                <View style={styles.modalheader}>
                                </View>
                                <View style={styles.modalCalendar}>
                                    <Calendar
                                        style={styles.calendar}
                                        onDayPress={this.onDayPress}
                                        markedDates={{
                                            [this.state.selected]: {
                                                selected: true,
                                                disableTouchEvent: true,
                                                selectedDotColor: "orange"
                                            }
                                        }}
                                        theme={{
                                            textSectionTitleColor: Colors.darkgray,
                                            selectedDayBackgroundColor: Colors.lightgray,
                                            selectedDayTextColor: "black",
                                            todayTextColor: Colors.darkPrimary,
                                        }}
                                        calendarFlag={3}
                                        Calendarheader_month={this.state.Calendarheader_month}
                                        setCalDate={this.setCalDate}
                                        changeYearMonth={this.changeYearMonth}
                                    />

                                </View>
                                <View style={styles.modalHourContainer}>
                                    <View style={styles.modalAmPm} >
                                        <ScrollPicker
                                            ref={(sp_am_pm) => { this.sp_am_pm = sp_am_pm }}
                                            dataSource={['오전', '오후']}
                                            /* selectedItem={result.am_pm} // 첫번째 인덱스는 무조건 선택 안됨.(시간, 분도 마찬가지) */
                                            selectedIndex={1}
                                            itemHeight={40}
                                            wrapperWidth={110}
                                            wrapperHeight={150}
                                            wrapperBackground={"white"}
                                            highlightColor={Colors.gray}
                                            highlightBorderWidth={1}
                                            activeItemColor={"white"}
                                            onValueChange={(data, selectedIndex) => {
                                                /* this.sp.scrollToIndex(result.am_pm_i); */
                                                result.am_pm = data;
                                                result.am_pm_i = selectedIndex;
                                                alert(result.am_pm);
                                            }}
                                            itemColor={Colors.darkPrimary}
                                        />
                                    </View>
                                    <View style={styles.modalHour} >
                                        <ScrollPicker
                                            dataSource={hour_arr}
                                            selectedIndex={hour - 1}
                                            itemHeight={40}
                                            wrapperWidth={110}
                                            wrapperHeight={150}
                                            wrapperBackground={"white"}
                                            highlightColor={Colors.gray}
                                            highlightBorderWidth={1}
                                            activeItemColor={"white"}
                                            onValueChange={(data, selectedIndex) => {
                                                hour = data;
                                            }}
                                            itemColor={"red"}
                                        />
                                    </View>
                                    <View style={styles.modalMin} >
                                        <ScrollPicker
                                            dataSource={minute_arr}
                                            selectedIndex={minute - 1}
                                            itemHeight={40}
                                            wrapperWidth={110}
                                            wrapperHeight={150}
                                            wrapperBackground={"white"}
                                            highlightColor={Colors.gray}
                                            highlightBorderWidth={1}
                                            activeItemColor={"white"}
                                            onValueChange={(data, selectedIndex) => {
                                                minute = data;
                                            }}
                                            itemColor={Colors.darkPrimary}
                                        />
                                    </View>
                                </View>
                                <View style={styles.modalButton}>
                                    <View style={styles.modalCnButton}>
                                        <TouchableHighlight onPress={() => { this.toggleEndCalendarModal() }}>
                                            <Text style={[common.font_mid, { color: Colors.darkPrimary }, { marginTop: wp("2%") }]}>취소</Text>
                                        </TouchableHighlight>
                                    </View>
                                    <View style={styles.modalSvButton}>
                                        <TouchableHighlight onPress={() => {
                                            result = getDateString(year, day, month, date, hour, minute, result.am_pm);
                                            this.setState({ final_date: result.final_date });
                                            this.setState({ end_date: result.final_date })
                                            this.toggleEndCalendarModal()
                                        }}>
                                            <Text style={[common.font_mid, { color: Colors.darkPrimary }, { marginTop: wp("2%") }]} >저장</Text>
                                            {/* 변수 확인용:  onPress = {(e) => {alert("최종: "+year+"년"+month+ "월"+date+"일"+day+ "요일"+ hour+ "시"+ minute+ "분"+ result.am_pm)}}  */}
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>

                        </Modal>
                        {/* select end date Modal -- end -- */}

                    </View>

                    <View style={styles.content_element_sub}>
                        {/* 아이콘 바꿔야 함 */}
                        <MIcon name="file-document-outline" size={30} color={Colors.gray}></MIcon>
                        <TextInput style={[common.font_small, styles.descriptionForm]}
                            onChangeText={(text) => { this.setState({ description: text }) }}
                            placeholder={'설명'}
                            value={this.state.description}
                        ></TextInput>
                    </View>

                    <View style={styles.content_element_sub}>
                        <Icon name="ios-alarm" size={30} color={Colors.gray}></Icon>
                        {/*알람설정 부분*/}
                        <Picker
                            selectedValue={this.state.alarm}
                            style={{ height: 30, width: 370 }}
                            onValueChange={(itemValue) => this.setState({ alarm: itemValue })}
                        >
                            <Picker.Item label="설정안함" value={0} />
                            <Picker.Item label="5분전" value={1} />
                            <Picker.Item label="10분전" value={2} />
                            <Picker.Item label="15분전" value={3} />
                            <Picker.Item label="30분전" value={4} />
                            <Picker.Item label="45분전" value={5} />
                            <Picker.Item label="1시간전" value={6} />
                        </Picker>

                    </View>

                    <View style={styles.content_element_sub}>
                        <Icon name="ios-color-palette" size={30} color={Colors.gray}></Icon>
                        {/*색상설정 부분*/}
                        <TouchableOpacity title="Theme" style={[styles.theme_btn, { borderColor: getColor(this.state.color) }, { backgroundColor: getColor(this.state.color) }]} onPress={() => { this.toggleColorModal() }}>
                        </TouchableOpacity>
                        <Modal isVisible={this.state.ColorModalVisible} onBackdropPress={() => { this.toggleColorModal() }}>
                            <View style={styles.colormodal_container}>
                                <View style={styles.colorModalTitle}>
                                    <Text style={[common.font_mid, common.font_bold, common.mb1, { color: Colors.gray }]}>일정 색상 설정</Text>
                                </View>
                                <View style={styles.colorModalUp}>
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._0 }, { backgroundColor: Colors._0 }, { left: wp("4%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(0) }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._1 }, { backgroundColor: Colors._1 }, { left: wp("8%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(1) }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._2 }, { backgroundColor: Colors._2 }, { left: wp("12%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(2) }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._3 }, { backgroundColor: Colors._3 }, { left: wp("16%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(3) }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._4 }, { backgroundColor: Colors._4 }, { left: wp("20%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(4) }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._5 }, { backgroundColor: Colors._5 }, { left: wp("24%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(5) }} />

                                </View>
                                <View style={styles.colorModalDown}>
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._6 }, { backgroundColor: Colors._6 }, { left: wp("4%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(6) }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._7 }, { backgroundColor: Colors._7 }, { left: wp("8%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(7) }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._8 }, { backgroundColor: Colors._8 }, { left: wp("12%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(8) }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._9 }, { backgroundColor: Colors._9 }, { left: wp("16%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(9) }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._10 }, { backgroundColor: Colors._10 }, { left: wp("20%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(10) }} />
                                    <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._11 }, { backgroundColor: Colors._11 }, { left: wp("24%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(11) }} />
                                </View>
                                <View style={styles.colorModalButton}>
                                    <TouchableOpacity onPress={() => this.toggleColorModal()}>
                                        <Text style={[common.font_mid, { color: Colors.darkPrimary }]}>취소</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                    </View>

                    <View style={styles.content_element_sub}>
                        <Icon name="ios-repeat" size={30} color={Colors.gray}></Icon>
                        {/*반복설정 부분*/}
                        <Picker
                            selectedValue={this.state.repeat}
                            style={{ height: 30, width: 370 }}
                            onValueChange={(itemValue) => this.setState({ repeat: itemValue })}
                        >
                            <Picker.Item label="반복안함" value={0} />
                            <Picker.Item label="매일" value={1} />
                            <Picker.Item label="매주" value={2} />
                            <Picker.Item label="매월" value={3} />
                            <Picker.Item label="매년" value={4} />
                        </Picker>
                    </View>

                    <TouchableOpacity style={[common.addButton, { left: 10 }]}
                        underlayColor={Colors.clicked} onPress={this.Back.bind(this)}>
                        <Text style={{ fontSize: 30, color: 'white' }}>X</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={common.addButton}
                        underlayColor={Colors.clicked} onPress={this.gotoHomeScreen.bind(this)}>
                        <Text style={{ fontSize: 30, color: 'white' }}>V</Text>
                    </TouchableOpacity>
                </View>
            </View>


        );
    }
} 