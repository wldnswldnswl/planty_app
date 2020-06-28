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
        paddingHorizontal: wp('3%')
    },
    
    theme_btn : {
       borderWidth : 1,
       /* borderColor : Colors._10, */
       width : 25,
       height : 25,
       /* backgroundColor : Colors._10, */
       borderRadius : 50,
       right : wp('-79%'),
       alignItems : 'center'
      
    },

    theme_toggle : {
        alignItems : 'center',
        right : wp('-60%')
        
    },

    selectWeek : {
        flexDirection : 'row',
        alignItems : 'center',
        right : wp('-58%')     
    },

    modal_container: {
        width: 350,
        height: 200,
        left : wp('3%'),
        right : wp('-3%'),
        borderRadius: 3,
        backgroundColor: 'white'
    },

    logout_modal_container: {
        width: 350,
        height: 150,
        left : wp('3%'),
        right : wp('-3%'),
        borderRadius: 3,
        backgroundColor: 'white'
    },

    modalTitle: {
        width: "100%",
        height:("20%"),
        left: wp('2%'),
        marginTop: wp('2%'),
        borderTopLeftRadius:3,
        borderTopRightRadius:3
    },

    modalContents: {
        flex:0.5,
        alignItems:"center",
        paddingVertical : hp('2%')

    },

    modalUp: {
        flex:1,
        alignItems:"center",
        flexDirection : 'row'
    },

    modalDown: {
        flex:1,
        alignItems:"center",
        flexDirection : 'row'
    },

    modalTheme: {
        width:40,
        height:40,
        borderRadius: 50
    },

    modalButton: {
        width: "100%",
        height:("20%"),
        alignItems:"center",
        borderBottomLeftRadius:3,
        borderBottomRightRadius:3
    },

   Button: {
        width: "50%",
        height:"100%",
        alignItems:"center"  
    }
}) 


export default styles;