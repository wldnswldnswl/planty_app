import React from 'react';
import { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    TouchableHighlight,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../styles/colors';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ReactNativePickerModule from 'react-native-picker-module';
import { TouchableOpacity } from 'react-native-gesture-handler';

//styles
import common from '../../../styles/common';
import styles from './style';


export default class AddScreen extends Component {


    //datepicker 생성자 추가
    constructor() {
        super()
        this.state = {
            isVisible: false,
            selectedValue: null,
            data: [
                "설정 안함",
                "5분전",
                "10분전",
                "15분전",
                "30분전",
                "45분전",
                "1시간전"
            ]
        }
    }

    /* //alarm select state 설정
    state = {
        selectedValue: null,
        data: [
            "설정 안함",
            "5분전",
            "10분전",
            "15분전",
            "30분전",
            "45분전",
            "1시간전"
        ]
    };

    //repeat select state 설정
    repeat_state = {
        selectedValue: null,
        data: [
            "반복 안함",
            "매일",
            "매주",
            "매월",
            "매년"
        ]
    }; */

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
        name:  handlePicker
        description: handle datepicker
    */
    handlePicker = () => {
        this.setState({
            isVisible: false
        })
    }

    /*
        name:  showPicker
        description: show datepicker
    */
    showPicker = () => {
        this.setState({
            isVisible: true
        })
    }

    /*
        name:  hidePicker
        description: hide picker
    */
    hidePicker = () => {
        this.setState({
            isVisible: false
        })
    }



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
                        <TouchableOpacity onPress={this.showPicker}>
                            <Text style={[common.font_mid, common.font_bold]}>년/월/일 시간</Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isVisible}
                            onConfirm={this.handlePicker}
                            onCancel={this.hidePicker} />
                        <DateTimePicker />
                    </View>
                    <View style={styles.content_element}>
                        <Text style={[common.font_mid, common.font_gray]}>종료일</Text>
                        <TouchableOpacity onPress={this.showPicker}>
                            <Text style={[common.font_mid, common.font_bold]}>년/월/일 시간</Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isVisible}
                            onConfirm={this.handlePicker}
                            onCancel={this.hidePicker} />
                        <DateTimePicker />
                    </View>

                    <View style={styles.content_element_sub}>
                        {/* 아이콘 바꿔야 함 */}
                        <MIcon name="file-document-outline" size={30} color={Colors.gray}></MIcon>
                        <TextInput style={[common.font_small, styles.descriptionForm]} placeholder={'설명'}></TextInput>
                    </View>

                    <View style={styles.content_element_sub}>
                        <Icon name="ios-alarm" size={30} color={Colors.gray}></Icon>
                        {/*알람설정 부분*/}
                        <TouchableOpacity onPress={() => { this.pickerRef.show() }}>
                            <Text style={[common.font_small, common.ml2, { paddingVertical: 1 }]}>반복 안함</Text>
                        </TouchableOpacity>
                        <ReactNativePickerModule
                            pickerRef={e => this.pickerRef = e}
                            value={this.state.selectedValue}
                            title={"알람 설정"}
                            items={this.state.data}
                            onValueChange={(index) => {
                                this.setState({
                                    selectedValue: index
                                })
                            }} />
                    </View>

                    <View style={styles.content_element_sub}>
                        <Icon name="ios-color-palette" size={30} color={Colors.gray}></Icon>
                        <TextInput style={[common.font_small, common.ml2, { paddingVertical: 1 }]} placeholder={'색상'}></TextInput>
                    </View>

                    <View style={styles.content_element_sub}>
                        <Icon name="ios-repeat" size={30} color={Colors.gray}></Icon>
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