//homescreen-index
import React from 'react';
import { Component } from 'react';
import {
    View,
    Text,
    Button,
    Image,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import Modal from 'react-native-modal';

//styles
import common from '../../../styles/common';
import styles from './style';
import { Calendar, calendarModal, modalReal } from 'react-native-calendars';
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

//현재 년도 저장
var year = new Date().getFullYear();
//현재 월 저장
var month = new Date().getMonth() + 1;
//버튼 선택에 따라 년도나 월들을 저장하는 배열 생성
var year_month = new Array();
//년도, 월별 화면 선택위한 변수
var select = true;
//일정 색깔 변수
var day_color = 'gray';


export default class HomeScreen extends Component {


    constructor(props) {
        super(props);



        selected: undefined
        this.state = {
            PickerModalVisible: false,
            CalendarModalVisible: false,
            selected: 'default',
            CalendarDate: 'default',
            CalendarMonth: 'default',
            pickerSelection: 'default'
        }

        this.gotoAddScreen = this.gotoAddScreen.bind(this);

    };


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
        name:  toggleCalendarModal
        description: show yearmonthday picker
    */
    toggleCalendarModal = (month, date) => {
        this.setState({ CalendarModalVisible: !this.state.CalendarModalVisible });
        this.setState({ CalendarDate: date });
        this.setState({ CalendarMonth: month });
        /* alert(JSON.stringify(day)); */
    }


    /*
        name: selyearmonth
        description: set select for yearmonth picker
    */
    /*  selyearmonth(sel) {
         select = sel;
     } */

    /*
        name: selyearcolor
        description: change year's color, month's color in picker
    */
    /*  selyearcolor = () => {
         year_color = Colors.darkPrimary;
         month_color = "black";
     } */

    /*
        name: selmonthcolor
        description: change year's color, month's color in picker
    */
    /*  selmonthcolor = () => {
         year_color = "black";
         month_color = Colors.darkPrimary;
     } */

    /*
        name: setyeararr
        description: set year array
    */
    /*  setyeararr = () => {
         year_month.length = 0;
         for (var i = 0; i < 12; i++) {
             var j = String(i + 1)
             year_month.push(j)
         }
     } */


    // HomeScreen : 캘린더
    render() {






        /*  const [modalVisible, setModalVisible] = useState(false);
         const [modalOutput, setModalOutput] = useState("년/월"); */

        return (

            <View style={styles.container}>
                <View style={styles.nav}>
                    <Icon name="ios-menu" size={30} color={Colors.gray}
                        onPress={this.gotoSideNav.bind(this)}
                    ></Icon>

                    <TouchableOpacity onPress={() => { this.togglePickerModal() }}>
                        <Text style={[common.font_title, { color: Colors.gray }]}>{year}.{month}</Text>
                    </TouchableOpacity>
                    <Modal isVisible={this.state.PickerModalVisible} onBackdropPress={() => { this.togglePickerModal() }} >

                        <View style={styles.modal_container}>
                            <View style={styles.modalheader}>
                            </View>

                            <View style={styles.modalyearmonth}>

                                <Text style={[common.font_title, { color: Colors.darkPrimary }, { fontSize: 43 }]}>{year}</Text>

                                <Text style={[common.font_title, { color: Colors.darkPrimary }, { fontSize: 28 }]}>{month}월</Text>

                            </View>


                            <View style={styles.modalContent}>

                                <Calendar />
                                {/*원래 계획했던 데이트피커*/}
                                {/* <ScrollPicker
                                    dataSource={year_month}
                                    selectedIndex={10}
                                    itemHeight={50}
                                    wrapperWidth={370}
                                    wrapperHeight={280}
                                    wrapperBackground={Colors.lightgray}
                                    highlightColor={Colors.gray}
                                    highlightBorderWidth={1}
                                    activeItemColor={"white"}
                                    itemColor={Colors.darkPrimary}
                                /> */}
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
                        onDayPress={this.onDayPress}
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
                    />
                    <TouchableHighlight style={common.addButton}
                        underlayColor={Colors.clicked} onPress={this.gotoAddScreen.bind(this)}>
                        <Text style={{ fontSize: 50, color: 'white' }}>+</Text>
                    </TouchableHighlight>
                </View>

                <Modal isVisible={this.state.CalendarModalVisible} onBackdropPress={() => { this.toggleCalendarModal() }} >
                    <View style={styles.modal_container} >
                        <View style={styles.daymodalheader} />
                        <View style={styles.daymodaldate}>
                            <Text style={{ fontSize: 30, color: Colors.darkgray, left: wp("5%") }}>{this.state.CalendarMonth + "월" + this.state.CalendarDate + "일"}</Text>
                        </View>
                        <View style={styles.daymodalline} />
                        {/* <ScrollView> */}
                        <View style={styles.daymodallist}>
                            <View style={styles.daymodalcontent}>
                                <View style={styles.daymodaltheme}>
                                    <Image style={[styles.daymodalcolortheme, { borderColor: day_color }, { backgroundColor: day_color }, { left: wp("2.5%") }, { top: wp("3%") }]} />
                                </View>

                                <View style={styles.daymodaltext}>
                                    <Text style={{ fontSize: 17, color: 'black', left: wp("1%"), top: wp("2%") }}>지운이랑 공부하기</Text>
                                    <Text style={{ fontSize: 10, color: Colors.darkgray, left: wp("1%"), top: wp("2%") }}>하루 종일</Text>
                                </View>
                            </View>
                            <View style={styles.daymodalcontent}>
                                <View style={styles.daymodaltheme}>
                                    <Image style={[styles.daymodalcolortheme, { borderColor: day_color }, { backgroundColor: day_color }, { left: wp("2.5%") }, { top: wp("3%") }]} />
                                </View>
                                <View style={styles.daymodaltext}>
                                    <Text style={{ fontSize: 17, color: 'black', left: wp("1%"), top: wp("2%") }}>대창 과제하기</Text>
                                    <Text style={{ fontSize: 10, color: Colors.darkgray, left: wp("1%"), top: wp("2%") }}>하루 종일</Text>
                                </View>
                            </View>
                        </View>
                        {/* </ScrollView> */}

                        <TouchableHighlight style={common.addButton}
                            underlayColor={Colors.clicked} onPress={() => { this.gotoAddScreen(); this.toggleCalendarModal() }}>
                            <Text style={{ fontSize: 50, color: 'white' }}>+</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>

            </View>

        );




    }
} 