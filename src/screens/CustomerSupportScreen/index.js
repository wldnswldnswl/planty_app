import React from 'react';
import { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Items from '../CustomerSupportItem'
import MyActionBar from '../MyActionBar'

//styles
import Colors from '../../../styles/colors';
import common from '../../../styles/common';
import styles from './style'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import IonIcon from 'react-native-vector-icons/Ionicons';


export default class CustomerSupportScreen extends Component {

    // functions

    // 고객지원 화면
    render() {
        return (
            <View style={styles.container}>

                <MyActionBar title="고객 지원" prev={this.props} />

                <View style={styles.content}>
                    <ScrollView>
                        {/* 1.캘린더 관련 문의 */}
                        <Items title="캘린더 관련 문의" info = {[
                            {title:"일정 등록하는 법", description:"일정의 제목, 날짜를 입력한 뒤 V 버튼을 눌러 일정을 등록할 수 있습니다.(나중에 설명 사진 추가하기)", nav: "일정등록", route:"Add"},
                            {title:"색깔 설정하는 법", description:"캘린더의 색깔을 임의로 지정할 수 있습니다.", nav:"색깔설정", route:"Home"}
                           ]} prev={this.props} ></Items>
                         {/* 2. 할일 관련 문의 */}
                        <Items title="할일 관련 문의" info={[
                            {title:"할일 등록하는 법", description:"일정의 제목, 날짜를 입력한 뒤 V 버튼을 눌러 할일을 등록할 수 있습니다.\n'메뉴-할일목록'에서 모든 할일들을 확인할 수 있습니다.", nav:"할일등록", route:"ToDo"}
                        ]} prev={this.props}></Items>
                        {/*3. 동기화 관련 문의 */}
                        <Items title="동기화 관련 문의" info={[
                            {title:"월경관리어플 연동하는 법", description:"월경관리를 위한 00,00 어플을 연동할 수 있습니다.", nav:"연동", route:"Home"},
                            {title:"가계부 어플 연동하는 법", description:"캘린더에서 하루 소비 금액을 조회하기 위해 00,00 어플을 연동할 수 있습니다.", nav:"연동", route:"Home"}
                    ]} prev={this.props}></Items> 
                        {/*4. 회원 관련 문의 */}
                        <Items title="회원 관련 문의" info={[
                            {title:"비밀번호 변경하는 법", description:"'메뉴-프로필'를 통해 비밀번호를 변경할 수있습니다.", nav:"비밀번호 설정", route:"Home"},
                            {title:"닉네임 변경하는 법", description:"'메뉴-프로필'를 통해 닉네임을 변경할 수있습니다.", nav:"닉네임 설정", route:"Home"},
                            {title:"회원탈퇴하는 법", description:"'메뉴-프로필'를 통해 회원탈퇴를 할 수있습니다.", nav:"회원탈퇴", route:"Home"}
                    ]} prev={this.props}></Items>                       
                    </ScrollView>
                </View>
            </View>
        );
    }
} 
