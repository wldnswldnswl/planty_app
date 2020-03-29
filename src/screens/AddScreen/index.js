import React from 'react';
import {Component} from 'react'; 
 import { 
     View, 
     Text, 
     Button,
     TextInput,
     TouchableHighlight,
 } from 'react-native'; 
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../styles/colors';

 //styles
 import common from '../../../styles/common'; 
 import styles from './style';


 export default class AddScreen extends Component{ 

     // functions

     /*
        name:  gotoAddScreen
        description: show Add Screen
    */
    add(){
        this.props.navigation.goBack();
    }


    // AddScreen: 일정(0), 할일(1) (전달된 파라미터에 따라 다른 view 생성하기!!!)
     render(){  
        //  const params = this.props.navigation.state;
        //  const itemId = params ? params.itemId : null;

         return ( 
            <View style = {styles.container}>
                <View style = {styles.nav}>
                    <TouchableHighlight style={[styles.tab_btn, styles.on]}>
                        <Text style={styles.on}>일정</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.tab_btn, styles.off]}>
                    <Text style={styles.off}>할일</Text>
                    </TouchableHighlight>
                </View>
                <View style = {styles.mainText}>
                    <TextInput style={[common.font_small, styles.textForm]} placeholder={'일정을 입력하세요'}></TextInput>
                </View>
                <View style = {styles.content}>
                    <View style = {[styles.content_element, common.mt2]}>
                        <Text style = {[common.font_mid, common.font_gray]}>시작일</Text>
                        <Text style = {[common.font_mid, common.font_bold]}>년/월/일 시간</Text>
                    </View>
                    <View style = {styles.content_element}>
                        <Text style = {[common.font_mid, common.font_gray]}>종료일</Text>
                        <Text style = {[common.font_mid, common.font_bold]}>년/월/일 시간</Text>
                    </View>

                    <View style = {styles.content_element_sub}>
                        {/* 아이콘 바꿔야 함 */}
                        <MIcon name="file-document-outline" size={30} color={Colors.gray}></MIcon> 
                        <TextInput style={[common.font_small, styles.descriptionForm]} placeholder={'설명'}></TextInput>
                    </View>

                    <View style = {styles.content_element_sub}>
                        <Icon name="ios-alarm" size={30} color={Colors.gray}></Icon> 
                    </View>

                    <View style = {styles.content_element_sub}>
                        <Icon name="ios-color-palette" size={30} color={Colors.gray}></Icon> 
                        <TextInput style={[common.font_small, common.ml2,{ paddingVertical:1 }]} placeholder={'색상'}></TextInput>
                    </View>

                    <View style = {styles.content_element_sub}>
                        <Icon name="ios-repeat" size={30} color={Colors.gray}></Icon> 
                    </View>

                    <TouchableHighlight style={[common.addButton,{left:10}]}
                        underlayColor={Colors.clicked} onPress={this.add.bind(this)}>
                        <Text style={{fontSize: 30, color: 'white'}}>X</Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight style={common.addButton}
                        underlayColor={Colors.clicked} onPress={this.add.bind(this)}>
                        <Text style={{fontSize: 30, color: 'white'}}>V</Text>
                    </TouchableHighlight>
                </View>
            </View> 
            
           
         ); 
     } 
 } 