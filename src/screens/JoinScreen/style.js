import React from "react";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import Colors from '../../../styles/colors'


// CSS 
// 수정예정
 const styles = StyleSheet.create({ 
    container: { 
         flex: 1, 
         backgroundColor: 'white', 
         paddingLeft: wp('15%'), 
         paddingRight: wp('15%'), 
         justifyContent: 'flex-start'
     }, 

     titleArea: { 
         width: '100%', 
         marginTop: hp('9%'),
         marginBottom : wp('9%'),
         alignItems: 'center', 
     }, 
     formArea: {
         width: '100%', 
         paddingBottom: wp('6%'), 
     }, 
     textForm: { 
        //  borderWidth: 0.5, 
        //  borderColor: '#888', 
         width: '100%', 
         height: hp('6%'), 
         paddingLeft: 5, 
         paddingRight: 5, 
         marginBottom: 5,
         marginTop: hp('1%')
        }, 
     buttonArea: { 
         width: '100%', 
         height: hp('7%'), 
    }, 
     button: { 
         width: "100%", 
         height: "100%", 
         marginTop: hp('3%'),
         justifyContent: 'center', 
         alignItems: 'center', 
     }, 
     blue: {
        backgroundColor: Colors.blue
     },
     green:{
        marginTop: hp('1%'),
        backgroundColor: Colors.naver
     },
     buttonTitle: { 
         color: 'white', 
         fontSize: wp('4%')
     }, 
     smallText:{
        fontSize: wp('3%'),
        textAlign: 'center',
        color: Colors.gray
     }
  
 }) 


 export default styles;