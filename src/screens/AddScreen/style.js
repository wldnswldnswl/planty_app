//addscreen-style
import React from "react";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import Colors from '../../../styles/colors' 
import common from '../../../styles/common'

 // css
 const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: 'white', 
        alignItems: "center",
        marginBottom: hp('2%'),
        paddingHorizontal: wp('3%')
        // padding: wp('5%')
    }, 
    nav: { 
        flex: 1,
        width: wp('100%'), 
        height: wp('100%'), 
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: wp('1%'),
        marginTop: hp('1%'),
        paddingTop: wp('3%')
   
    }, 
    mainText: { 
        flex: 1.3,
        width: wp('100%'), 
        height: wp('100%'),
        paddingHorizontal: wp('3%') 
    }, 

    content: { 
        flex: 8,
        width: "100%", 
        height: "100%",
        flexDirection: 'column',
    },

    content_element: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp('0.5%')
    },

    content_element_sub: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop: hp('3%')
    },

    textForm: { 
        borderWidth: 0.6, 
        borderColor: '#888', 
        width: '100%', 
        paddingLeft: wp('2%'), 
        paddingRight:wp('2%'), 
        marginBottom: 5,
        paddingVertical:hp('3%'),
        justifyContent:'center'
       },

    descriptionForm: {
        marginLeft: wp('3%'),
        borderBottomColor: Colors.gray,
        borderBottomWidth:0.7,
        width:wp('80%'),
        paddingVertical:1
    },

    tab_btn:{
        borderRadius:50,
        borderWidth:1,
        borderColor: Colors.darkPrimary,
        padding:wp('2%'),
        width:wp('20%'),
        height:hp('5%'),
        backgroundColor:Colors.darkPrimary,
        marginLeft: wp('2.5%')
    },  

    on:{
        color: "white",
        backgroundColor: Colors.darkPrimary,
        textAlign: 'center'
    },

    off:{
        color: Colors.darkPrimary,
        backgroundColor: "white",
        textAlign: 'center'
    },

    modal_container: {
        alignItems:"center",
        width:330,
        height:600,
        left:wp("5%"),
        backgroundColor: 'white',
        borderRadius: 3,
    },

    modalheader: {
        width:'100%',
        height:'3%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 3,
        borderTopRightRadius:3,
        backgroundColor:Colors.darkPrimary
    },
    
    modalyearmonth: {
        width : '100%',
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    modalCalendar: {
        width : '100%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    modalHourContainer: {
        width : '100%',
        height: '22%',
        flexDirection: 'row'
    },

    modalAmPm: {
        flex:1,
        alignItems: 'center'
    },

    modalHour: {
        flex:1,
        alignItems: 'center'
    },

    modalMin: {
        flex:1,
        alignItems: 'center'
    },

    modalButton: {
        width : '100%',
        height: '7%',
        flexDirection: 'row',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },

    modalCnButton: {
        flex:1,
        borderBottomLeftRadius: 3,
        alignItems: "center"
    },

    modalSvButton: {
        flex:1,
        borderBottomRightRadius: 3,
         alignItems: "center"
    },

    calendar: {
        // marginBottom: 10
    },

    theme_btn : {       
        borderWidth : 1,
        width : 20,
        height : 20,
        borderRadius : 50,
        left : wp('3%'),
        alignItems : 'center'
       
     },

     colormodal_container: {
        width: 350,
        height: 200,
        left : wp('3%'),
        right : wp('-3%'),
        borderRadius: 3,
        backgroundColor: 'white'
    },

    colorModalTitle: {
        width: "100%",
        height:("20%"),
        left: wp('2%'),
        marginTop: wp('2%'),
        borderTopLeftRadius:3,
        borderTopRightRadius:3
    },

    colorModalUp: {
        flex:1,
        alignItems:"center",
        flexDirection : 'row'
    },

    colorModalDown: {
        flex:1,
        alignItems:"center",
        flexDirection : 'row'
    },

    colorModalTheme: {
        width:40,
        height:40,
        borderRadius: 50
    },

    colorModalButton: {
        width: "100%",
        height:("20%"),
        alignItems:"center",
        borderBottomLeftRadius:3,
        borderBottomRightRadius:3
    }

}) 


export default styles;