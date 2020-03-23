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
        paddingHorizontal: wp('3%'),
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
    }
}) 


export default styles;