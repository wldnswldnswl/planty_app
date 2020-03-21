import React from "react";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import Colors from './colors';


  // CSS 
 // 수정예정
 const common = StyleSheet.create({ 

    // 폰트 사이즈
    font_title: { 
        fontSize: wp('8%'), 
    }, 

    font_mid:{
        fontSize : wp('4.5%')
    },

    font_small:{
        fontSize : wp('3.5%')
    },

    font_gray:{
        color: Colors.gray
    },

    font_bold:{
        fontWeight:'bold'
    },

    // margin 
    // 2% 간격
    mt2:{
        marginTop: hp('2%')
    },

    mb2:{
        marginBottom: hp('2%')
    },

    mv2: {
        marginVertical : hp('2%')
    },

    ml2:{
        marginLeft: wp('2%')
    },

     // 4% 간격
    mt4:{
        marginTop: hp('4%')
    },

    mb4:{
        marginBottom: hp('4%')
    },

    mv4: {
        marginVertical : hp('4%')
    },

     // 6% 간격
    mt6:{
        marginTop: hp('6%')
    },

    mb6:{
        marginBottom: hp('6%')
    },

    mv6: {
        marginVertical : hp('6%')
    },

    mt2_5: {
        marginTop: hp('2.5%')
    },

    // **공통 효과
    linkEffect: {
        textDecorationLine: 'underline',
        color: Colors.blue
    },

    addButton: {
        backgroundColor: Colors.darkPrimary,
        borderColor: Colors.darkPrimary,
        borderWidth: 1,
        height: 60,
        width: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right:10,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0
        }
      }
 }) 


 export default common;