//homescreen-index
import React from 'react';
import { Component } from 'react';
import {
    View,
    Text,
    Button,
    Image,
    TouchableHighlight,
    AsyncStorage
    /* ScrollView */
} from 'react-native';
import Modal from 'react-native-modal';
import XDate from 'xdate';

//styles
import common from '../../../styles/common';
import styles from './style';
import { Calendar, calendarModal, modalReal } from 'react-native-calendars';
import CalendarHeader from 'react-native-calendars/src/calendar/header';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../styles/colors';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { createStackNavigator } from '@react-navigation/drawer';
import { DrawerActions } from 'react-navigation-drawer';

import Drawer from '../drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-navigation';

import { ScrollView } from 'react-native-gesture-handler';
import { getApi, change_date, change_month } from '../../common/common';

//일정 및 할일 색깔을 임시로 저장하는 변수
var day_color;
//일정 및 할일을 임시로 저장하는 변수
var day_content;
//일정 및 할일 데이터를 저장하는 변수
/* var day_data = []; */

export default class HomeScreen extends Component {


    constructor(props) {
        super(props);

        selected: undefined
        this.state = {
            PickerModalVisible: false,
            CalendarModalVisible: false,
            CalendarDate: 'default',
            CalendarMonth: 'default',
            CalendarDay: 'default',
            pickerSelection: 'default',
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            Calendarheader_month: props.current ? parseDate(props.current) : XDate(),
            email: "",
            todo_list: [],
            calendar_list: []
        }

        this.gotoAddScreen = this.gotoAddScreen.bind(this);

    };

    componentDidMount = async () => {

        await AsyncStorage.getItem("email", (errs, result) => {
          if (!errs) {
            if (result !== null) {
              this.setState({ "email": result });
            }
          }
        });
    }

    onDayPress = (day) => {
        this.setState({ selected: day.dateString });
    }


    // functions

    /*
       name:  gotoAddScreen
       description: show Add Screen
   */
    gotoAddScreen = () => {
        this.props.navigation.navigate("Add");
    }

    /*
       name:  gotoAddScreen_params
       description: show Add Screen with params
   */
    /* gotoAddScreen_params = (flag, year, month, date, day) => {
        this.props.navigation.navigate("Add", { "flag": flag, "year": year, "month": month, "date": date, "day": day });
    }
 */
    /*
       name:  gotoSideNav
       description: show Setting Nav
   */
    gotoSideNav() {
        this.props.navigation.toggleDrawer();
    }

    /*
        name:  togglePickerModal
        description: show yearmonthday picker
    */
    togglePickerModal = () => {
        this.setState({ PickerModalVisible: !this.state.PickerModalVisible });
    }

    /*
        name:  setDayName
        description: set day in korean
    */
    setDayName(en_day) {
        var ko_day;

        if (en_day == "Sun" || en_day == 0)
            ko_day = "일"
        else if (en_day == "Mon" || en_day == 1)
            ko_day = "월"
        else if (en_day == "Tue" || en_day == 2)
            ko_day = "화"
        else if (en_day == "Wed" || en_day == 3)
            ko_day = "수"
        else if (en_day == "Thu" || en_day == 4)
            ko_day = "목"
        else if (en_day == "Fri" || en_day == 5)
            ko_day = "금"
        else
            ko_day = "토"

        return (ko_day);
    }

    /*
        name:  toggleCalendarModal
        description: show yearmonthday picker
    */
    toggleCalendarModal = () => {
        this.setState({ CalendarModalVisible: !this.state.CalendarModalVisible });
    }

    /*
        name:  setDateModal
        description: set month, date, day in calendar modal
    */
    setDateModal = async(month, date, day ) => {
        this.setState({ CalendarDate: change_date(date) });
        this.setState({ CalendarMonth: change_month(month) });
        this.setState({ CalendarDay: this.setDayName(day) });

        const end_date = this.state.year+"."+month+"."+date;
        const response = await getApi("ApiToDoList","/todolist/getCurrentDayList/"+JSON.parse(this.state.email)+"/"+end_date);
       
        /* const response = await getApi("ApiToDoList","/todolist/getCurrentDayList/planty.adm@gmail.com/2020.05.06(수) 오전 03:55_33eef3e7-d45b-4cc0-a606-9ae102ed52c3"); */
        
        console.log("response: ",response);
    }

    /*
        name:  changeYearMonth
        description: change year, month of header, calendar modal
    */
    changeYearMonth = (calendar) => {
        this.setState({ Calendarheader_month: calendar });
        this.setState({ year: calendar.toString('yyyy') });
        this.setState({ month: change_month(calendar.toString('MM'))});

        this.forceUpdate();
    }
    
    goToUpdateScreen = (index, day_list) => {
        switch(index){
            case 0: //캘린더
                break;
            case 1: //할일
                alert("Dd");
                this.props.navigation.navigate("ToDo", {data : day_list});
                break;

        }
    }
    // HomeScreen : 캘린더
    render() {

        //할일 목록들 day_list에 맵핑
       /*  const day_list = this.state.day_data.map(day_list => {
            return (
                <View style={styles.daymodalcontent} > 
                    <View style={styles.daymodaltheme}>
                        <View style={[styles.daymodalcolortheme, { borderColor: day_list.theme_color }, { backgroundColor: day_list.theme_color }, { left: wp("1.5%") }, { top: wp("3%") }]} />
                    </View>

                    <View style={styles.daymodaltext}>
                        <Text style={{ fontSize: 17, color: day_list.content_color }}>{day_list.content}</Text>
                        <Text style={{ fontSize: 10, color: Colors.darkgray }}>{day_list.time}</Text>
                    </View>
                </View>
            )
        }) */

        return (

            <View style={styles.container}>
                <View style={styles.nav}>
                    <Icon name="ios-menu" size={30} color={Colors.gray}
                        onPress={this.gotoSideNav.bind(this)}
                    ></Icon>

                    <TouchableOpacity onPress={() => { this.togglePickerModal() }}>
                        <Text style={[common.font_title, { color: Colors.gray }]}>{this.state.year}.{this.state.month}</Text>
                    </TouchableOpacity>
                    <Modal isVisible={this.state.PickerModalVisible} onBackdropPress={() => { this.togglePickerModal() }} >

                        <View style={styles.modal_container}>
                            <View style={styles.modalheader}>
                            </View>

                            <View style={styles.modalyearmonth}>

                                <Text style={[common.font_title, { color: Colors.darkPrimary }, { fontSize: 43 }]}>{this.state.year}</Text>

                                <Text style={[common.font_title, { color: Colors.darkPrimary }, { fontSize: 28 }]}>{this.state.month}월</Text>

                            </View>


                            <View style={styles.modalContent}>

                                <Calendar
                                    style={styles.calendar}
                                    current={this.state.Calendarheader_month}
                                    calendar_flag={false}
                                />

                            </View>


                            <View style={styles.modalButton}>
                                <TouchableHighlight onPress={() => { this.togglePickerModal() }}>
                                    <Text style={[common.font_mid, { color: Colors.darkPrimary }]}>완료</Text>
                                </TouchableHighlight>
                            </View>

                        </View>

                    </Modal>

                    {/* 먼슬리 -> 위클리 전환 */}
                    <Icon name="ios-calendar" size={30} color={Colors.gray}></Icon>

                    {/* 위클리 -> 먼슬리 전환 */}
                    {/* 모듈 업데이트되면서 아이콘 사라짐;; */}
                </View>
                <View style={styles.content}>
                    <Calendar
                        style={styles.Calendar}
                        calendarHeight={500}
                        hideExtraDays={false}
                        onDayPress= {this.onDayPress}
                        markedDates={{
                            [this.state.selected]: {
                                selected: true,
                                disableTouchEvent: true,
                                selectedDotColor: "orange"
                            }
                        }}
                        calendar_flag={true}

                        theme={{
                            "stylesheet.calendar.header": {
                                header: {
                                    height: 0,
                                    opacity: 0
                                }
                            },

                            textSectionTitleColor: Colors.darkgray,
                            selectedDayBackgroundColor: Colors.lightgray,
                            selectedDayTextColor: "black",
                            todayTextColor: Colors.darkPrimary,
                        }}
                        toggleCalendarModal={this.toggleCalendarModal}
                        changeYearMonth={this.changeYearMonth}
                        setDateModal={this.setDateModal}
                    /* dayContent={this.state.day_data} */

                    />
                    <TouchableHighlight style={common.addButton}
                        underlayColor={Colors.clicked} onPress={this.gotoAddScreen.bind(this)}>
                        <Text style={{ fontSize: 50, color: 'white' }}>+</Text>
                    </TouchableHighlight>
                </View>

                <Modal isVisible={this.state.CalendarModalVisible} onBackdropPress={() => { this.toggleCalendarModal() }} >
                    <View style={styles.daymodal_container} >
                        <View style={styles.daymodalheader} />
                        <View style={styles.daymodaldate}>
                            <Text style={{ fontSize: 30, color: Colors.darkgray, left: wp("5%") }}>{this.state.CalendarMonth + "월" + this.state.CalendarDate + "일 " + this.state.CalendarDay}</Text>
                        </View>
                        <View style={styles.daymodalline} />

                        <ScrollView style={styles.scrollView}>
                            <View style={styles.daymodallist}>
                               {/*  {day_list} */}
                            </View>
                        </ScrollView>

                        <TouchableHighlight style={common.addButton}
                            underlayColor={Colors.clicked} onPress={() => {this.gotoAddScreen(); /* this.gotoAddScreen_params(true, this.state.CalendarMonth, this.state.CalendarDate, this.state.CalendarDay); */ this.toggleCalendarModal() }}>
                            <Text style={{ fontSize: 50, color: 'white' }}>+</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>

            </View>

        );




    }
} 

