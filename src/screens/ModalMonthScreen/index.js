import React from 'react';
import { Component } from 'react';
import {
    View,
    Text,
    Button,
    Image,
    TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';

//styles
import common from '../../../styles/common';
import styles from './style';
import Colors from '../../../styles/colors';
import ScrollPicker from 'react-native-wheel-scroll-picker';

//현재 년도 저장
var year = new Date().getFullYear();
//현재 월 저장
var month = new Date().getMonth() + 1;
//버튼 선택에 따라 년도나 월들을 저장하는 배열 생성
var year_month = new Array();

export default class ModalScreen extends Component {


    constructor(props) {
        super(props);

        selected: undefined
        this.state = {
            isModalVisible: false,
            pickerSelection: 'default'
        }
    }

    render() {
        <View style={styles.modal_container}>
            <View style={styles.modalheader}>
            </View>

            <View style={styles.modalyearmonth}>

                <TouchableHighlight onPress={this.selyearcolor} >

                    <Text style={[common.font_title, { color: year_color }, { fontSize: 45 }]}>{year}</Text>

                </TouchableHighlight>
                <TouchableHighlight onPress={() => { this.setyeararr() }}>
                    <Text style={[common.font_title, { color: month_color }, { fontSize: 30 }]}>{month}월</Text>
                </TouchableHighlight>

            </View>


            <View style={styles.modalContent}>


                {/*원래 계획했던 데이트피커*/}
                <ScrollPicker
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
                />
            </View>


            <View style={styles.modalButton}>
                <TouchableHighlight onPress={() => { this.toggleModal() }}>
                    <Text style={[common.font_mid, { color: Colors.darkPrimary }]}>완료</Text>
                </TouchableHighlight>
            </View>

            {/* <Text>Hello!</Text>
                            <Button title="Hide modal" onPress={this.toggleModal} /> */}
        </View>
    }

} 