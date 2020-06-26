import React from 'react';
import { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { API } from 'aws-amplify';
import XDate from 'xdate';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../styles/colors';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import { Calendar } from 'react-native-calendars';

import { getApi, postApi, getDateString, getSession, getColor } from '../../common/common'
//styles
import common from '../../../styles/common';
import styles from './style';
// import { ScrollView } from 'react-native-gesture-handler';

//현재 년도/월/일자/요일/시간 저장
var year, month, date, day, hour, minute;
// var am_pm, am_pm_i;

// 출력값 계산 결과
var result = {
    final_date: null,//최종 날짜
    am_pm: null,
    am_pm_i: null
}
// , final_date = null;


// 시간을 저장하는 배열 생성
var hour_arr = new Array();
// 분을 저장하는 배열 생성
var minute_arr = new Array();

export default class ToDoScreen extends Component {

    //datepicker 생성자 추가
    constructor(props) {
        super(props)

        /* console.log(this.props.navigation.getParam('data',"nodata")); */
        this.state = {
            isNew: this.props.route.params.isNew,
            uuid: this.props.route.params.uuid,
            CalendarModalVisible: false,
            ColorModalVisible: false,
            isVisible: false,
            Calendarheader_month: props.current ? parseDate(props.current) : XDate(),

            // put params start
            email: null,
            title: null,
            end_date: null,
            description: "",
            color: 0, // View에서 값 받는 설정 아직 안함. 
            // put params end

            final_date: null,
            selected: null
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
        name:  gotoAddScreen
        description: show Add Screen
    */
    gotoAddScreen() {
        this.props.navigation.navigate("Add", {
            isNew: this.state.isNew,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            date: new Date().getDate(),
            day: new Date().getDay()
        });
    }

    /*
        name:  gotoHomeScreen
        description: show Home Screen
    */
    gotoHomeScreen() {
        const params = {
            email: this.state.email,
            title: this.state.title,
            end_date: this.state.end_date,
            description: this.state.description,
            color: this.state.color
        }

        console.log("getToDoList: ", this.state.isNew);
        // console.log(getApi('ApiToDoList','/todolist'));//&& params.end_date != null && params.end_date.trim() != ""
        if (params.title != null && params.title.trim() != "") {
            if (this.state.isNew) postApi('ApiToDoList', '/todolist', params);
            else postApi('ApiToDoList', '/todolist/updateData', params);
            this.props.navigation.navigate("Home");

        } else {
            alert("할 일을 입력하세요"); // 나중에 비동기 이용해 빨간글씨로 바꾸기
        }

    }

    /*
        name:  Back
        description: screen back,
    */
    Back() {
        // this.props.navigation.goBack(); // 로 하면 스택에 쌓인 할일/일정 페이지들이 나옴
        this.props.navigation.navigate("Home");
    }

    /*
        name:  toggleCalendarModal
        description: show Calendar modal
    */
    toggleCalendarModal = (flag, text) => {
        if (flag == 'fresh') this.getCurrentDate(); // 현재 날짜로 초기화
        // else if(flag == 'save'){
        //     this.setState({final_date: text})
        // }

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
        result.am_pm == '오전' ? result.am_pm_i = 0 : 1;

        // console.log("dd");
        // console.log(result.final_date);
        // console.log("i: ",result.am_pm_i);
    }

    getSelectedInfo = async () => {

        // 기존 할일 불러오기
        const path_todolist = "/todolist/getModifyData/" + this.state.email + "/" + this.state.uuid;
        const response_todolist = (await getApi("ApiToDoList", path_todolist))[0];

        // 기존 내용으로 변수 갱신
        result.final_date = response_todolist.end_date;
        result.am_pm == '오전' ? result.am_pm_i = 0 : 1;
        this.setState({ "title": response_todolist.title })
        if (this.state.description != null) this.setState({ "description": response_todolist.description });
        this.setState({ "color": response_todolist.color });
        // console.log("R: ",response_todolist);

    }

    deleteThisCalendar = async () => {
        console.log("삭제버튼");
        console.log(this.state.email);
        console.log(this.state.uuid);
        //     const data = await API.del("ApiToDoList","/object/"+this.state.email+"/"+this.state.uuid).then(response => {
        //         // Add your code here
        //         console.log('deleted');
        //       }).catch(error => {
        //         console.log("error",error.response);
        //       });
        //    console.log(data);
        this.props.navigation.navigate("Home");
    }

    onDayPress = (day) => {
        this.setState({ selected: day.dateString });
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


    // AddScreen: 일정(0), 할일(1) (전달된 파라미터에 따라 다른 view 생성하기!!!)
    render() {
        //  const params = this.props.navigation.state;
        //  const itemId = params ? params.itemId : null;

        const isLoggedIn = !this.state.isNew;
        let deleteBtn = null;
        let calendarBtn = null;

        // View 동적 생성(삭제버튼, 할일 수정 시 할일 버튼만 띄우기)
        if (isLoggedIn) {
            deleteBtn = <TouchableOpacity style={[styles.delete_btn]} onPress={this.deleteThisCalendar.bind(this)}>
                <Text style={styles.off}>삭제</Text>
            </TouchableOpacity>;
            calendarBtn = null;
        } else {
            calendarBtn = <TouchableHighlight style={[styles.tab_btn, styles.off]} onPress={this.gotoAddScreen.bind(this)}>
                <Text style={styles.off}>일정</Text>
            </TouchableHighlight>;
            deleteBtn = null;
        }


        return (

            <View style={styles.container}>
                <View style={styles.nav}>
                    <View isLoggedIn={isLoggedIn}>{calendarBtn}</View>
                    <TouchableHighlight style={[styles.tab_btn, styles.on]} >
                        <Text style={styles.on}>할일</Text>
                    </TouchableHighlight>
                    <View isLoggedIn={isLoggedIn}>{deleteBtn}</View>
                </View>
                <View style={styles.mainText}>
                    {/* title */}
                    <TextInput style={[common.font_small, styles.textForm]}
                        placeholder={'할일을 입력하세요'}
                        onChangeText={(text) => { this.setState({ title: text }) }}
                        value={this.state.title}
                    //    {apiData :{title: text, description:this.state.apiData['description'], end_date: this.state.apiData['end_date'], color: this.state.apiData['color']}})
                    ></TextInput>
                </View>
                <View style={styles.content}>
                    {/* end_date */}
                    <View style={[styles.content_element, common.mt2]}>
                        <Text style={[common.font_mid, common.font_gray]}>완료일</Text>
                        <TouchableOpacity onPress={() => { this.toggleCalendarModal() }}>
                            <Text style={[common.font_mid, common.font_bold]}>
                                {result.final_date} </Text>
                        </TouchableOpacity>
                    </View>

                    {/* select date Modal -- start -- */}
                    <Modal isVisible={this.state.CalendarModalVisible} onBackdropPress={() => { this.toggleCalendarModal('fresh') }}>
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
                                    calendar_flag={3}
                                    Calendarheader_month={this.state.Calendarheader_month}
                                    setCalDate={this.setCalDate}
                                    changeYearMonth={this.changeYearMonth}
                                />

                            </View>
                            <View style={styles.modalHourContainer}>
                                <View style={styles.modalAmPm} >
                                    <ScrollPicker
                                        dataSource={['오전', '오후']}
                                        selectedIndex={result.am_pm_i} // 첫번째 인덱스는 무조건 선택 안됨.(시간, 분도 마찬가지)
                                        itemHeight={40}
                                        wrapperWidth={110}
                                        wrapperHeight={150}
                                        wrapperBackground={"white"}
                                        highlightColor={Colors.gray}
                                        highlightBorderWidth={1}
                                        activeItemColor={"white"}
                                        onValueChange={(data, selectedIndex) => {
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
                                    <TouchableHighlight onPress={() => { this.toggleCalendarModal() }}>
                                        <Text style={[common.font_mid, { color: Colors.darkPrimary }, { marginTop: wp("2%") }]}>취소</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={styles.modalSvButton}>
                                    <TouchableHighlight onPress={() => {
                                        result = getDateString(year, day, month, date, hour, minute, result.am_pm);
                                        this.setState({ final_date: result.final_date });
                                        this.setState({ end_date: result.final_date })
                                        this.toggleCalendarModal()
                                    }}>
                                        <Text style={[common.font_mid, { color: Colors.darkPrimary }, { marginTop: wp("2%") }]} >저장</Text>
                                        {/* 변수 확인용:  onPress = {(e) => {alert("최종: "+year+"년"+month+ "월"+date+"일"+day+ "요일"+ hour+ "시"+ minute+ "분"+ result.am_pm)}}  */}
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>

                    </Modal>
                    {/* select date Modal -- end -- */}


                    {/* description */}
                    <View style={styles.content_element_sub}>
                        <MIcon name="file-document-outline" size={30} color={Colors.gray}></MIcon>
                        <TextInput style={[common.font_small, styles.descriptionForm]}
                            onChangeText={(text) => { this.setState({ description: text }) }}
                            placeholder={'설명'}
                            value={this.state.description}></TextInput>
                    </View>

                    <View style={styles.content_element_sub}>
                        <Icon name="ios-color-palette" size={30} color={Colors.gray}></Icon>
                        {/*color*/}
                        <TouchableOpacity title="Theme"
                            style={[styles.theme_btn, { borderColor: getColor(this.state.color) }, { backgroundColor: getColor(this.state.color) }]} onPress={() => { this.toggleColorModal() }}
                        >
                        </TouchableOpacity>
                        <Modal isVisible={this.state.ColorModalVisible} onBackdropPress={() => { this.toggleColorModal() }}>
                            <View style={styles.colormodal_container}>
                                <View style={styles.colorModalTitle}>
                                    <Text style={[common.font_mid, common.font_bold, common.mb1, { color: Colors.gray }]}>할일 색상 설정</Text>
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