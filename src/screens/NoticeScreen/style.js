import React from "react";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import Colors from '../../../styles/colors' 
import common from "../../../styles/common";

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

    content: { 
        flex: 10,
        width: "100%", 
        height: "100%", 
        padding: wp('5%')
    }
}) 


export default styles;