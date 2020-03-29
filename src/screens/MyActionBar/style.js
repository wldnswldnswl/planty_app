import React from "react";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import Colors from '../../../styles/colors';

 // css
 const styles = StyleSheet.create({ 
   bar : {
       width : "100%",
       backgroundColor : Colors.primary,
       paddingVertical : 30
   },

   barText : {
       color : "#fff",
       fontWeight : "bold",
       fontSize : 30,
       textAlign : 'center',
       marginLeft :  wp('-16%') 
   }
}) 


export default styles;