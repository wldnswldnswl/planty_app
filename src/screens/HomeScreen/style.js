//homescreen-style
import React from "react";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import Colors from '../../../styles/colors' 

 // css
 const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        // padding: wp('5%'), 
        marginBottom: hp('2%'),
        alignItems: "center",
        // paddingHorizontal: wp('3%'),
        backgroundColor: 'white'
    }, 

    nav: { 
        flex: 1,
        width: wp('90%'), 
        height: wp('90%'), 
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: wp('3%'), 
        flexDirection: 'row'
    }, 

    content: { 
        flex: 10,
        width: "100%", 
        height: "100%", 
    },

    calendar: {
        // marginBottom: 10
    },

    modal_container: {
        alignItems:"center",
        width:340,
        height:500,
        backgroundColor: 'white',
        borderRadius: 10,
        left: wp("4%")
    },

    modalheader: {
        width:"100%",
        height:'3%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius:10,
        backgroundColor:Colors.darkPrimary
    },
    
    modalyearmonth: {
        width : "100%",
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
    },

    modalContent: {
        width : "100%",
        height: '69%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
    },

    modalButton: {
        width : "100%",
        height: '6%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius:10,
        backgroundColor:'white'
    },

    daymodalheader: {
        width: "100%",
        height: '5%',
        borderTopLeftRadius: 10,
        borderTopRightRadius:10
    },

    daymodaldate: {
        width: "100%",
        height: "10%"
    },

    daymodalline: {
        width: "91%",
        height: 1,
        backgroundColor: Colors.darkgray
    },

    daymodalcolortheme: {
        width: 13,
        height: 13,
        borderRadius: 50
    },

    daymodallist: {
        width: "90%",
        height: "82%"/* ,
        backgroundColor: "skyblue" */
    },

    daymodalcontent: {
        width: "100%",
        height: "20%",
        flexDirection: "row"/* ,
        backgroundColor: 'lightgray' */
    },

    daymodaltheme: {
        width: "23%",
        alignContent: "center"/* ,
        backgroundColor: 'yellow' */
    },

    daymodaltext: {
        width: "100%"/* ,
        backgroundColor: 'pink' */
    },
    
    scrollView: {
        width: "100%",
        flexDirection:'row',
        backgroundColor: 'skyblue'
    }


}) 


export default styles;