import React from 'react';
import {Component} from 'react'; 
import { 
     View, 
     Text,
     TouchableOpacity,
     Button
} from 'react-native';
import renderIf from './renderIf';

//styles
import Colors from '../../../styles/colors';
import common from '../../../styles/common'; 
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import IonIcon from 'react-native-vector-icons/Ionicons';

export default class CustomerSupportItem extends Component{

    constructor(props){
        super(props);
        this.state ={
          status: true,
          info : null,
          icon : "ios-arrow-down",
          color: Colors.darkgray,
          title : this.props.title,
          // description: this.props.description,
          // nav: this.props.nav 
        }

        // console.log(props);
      }

     
    
      toggleStatus = () => {
        this.setState({
          status:!this.state.status
        });


        if(this.state.status){
          this.setState({"info" : this.props.info});
          this.setState({"icon" : this.state.icon.substring(0,10) + "up"});
          this.setState({"color" : Colors.primary});
        }else{
          this.setState({"info" : null});
          this.setState({"icon" : this.state.icon.substring(0,10) + "down"});
          this.setState({"color" : Colors.darkgray});
        }

      }


    render(){

        // const icon = this.state.status;

         // View 동적 생성(삭제버튼, 캘린더 수정 시 캘린더 버튼만 띄우기)
        //  if(showDetails){
        //      this.setState({"info" : this.props.info});
        // }else {
        //   this.setState({"info" : null});
        // }

        // console.log(this.state.info);
        return(
            <View>
                <TouchableOpacity style = {[{flexDirection : 'row', alignItems:'center', alignContent:'center'}, common.ml2]}
                     onPress={() => { this.toggleStatus() }}>
                    <Text style = {[common.font_bold, common.font_mid, common.mv2, {width:wp('86%'), color : this.state.color}]}> {this.state.title} </Text>
                    <IonIcon name = {this.state.icon} color = {this.state.color} size = {20} >
                    </IonIcon> 
                </TouchableOpacity>
                <View>
                  {this.state.info&&( 
                                this.state.info.map( (data) => {
                                  console.log(data);
                                    return <TouchableOpacity onPress = {() => {this.props.prev.navigation.navigate("Contents",{
                                      title : data.title,
                                      description: data.description,
                                      nav: data.nav,
                                      route : data.route
                                    })}}><Text style = {[common.font_bold, common.font_mid_small,{marginHorizontal : wp('3.5%'), marginVertical: wp("1%")}]}>{data.title}</Text></TouchableOpacity>
                                })
                           )}
                </View>
            </View>
        );
    }    
}


