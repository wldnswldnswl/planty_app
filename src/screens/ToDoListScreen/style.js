import React from "react";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 

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
    // nav: { 
    //     flex: 1,
    //     width: wp('100%'), 
    //     height: wp('100%'), 
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     paddingVertical: wp('3%'), 
    //     flexDirection: 'row'   
    // }, 

    content: { 
        flex: 10,
        width: "100%", 
        height: "100%", 
        paddingHorizontal: wp('3%')
    },
    
    list: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderColor: '#000',
        borderBottomWidth: 1
      },

      //추가한거 지워
      button: {
          width:250,
          height:50,
          backgroundColor:'#330066',
          borderRadius:30,
          justifyContent:'center',
          marginTop:15
      },

      
}) 


export default styles;