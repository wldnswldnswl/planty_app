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

    constructor(){
        super();
        this.state ={
          status:false
        }
      }
    
      toggleStatus(){
        this.setState({
          status:!this.state.status
        });
        console.log('toggle button handler: '+ this.state.status);
      }

    render(){

        const flag = this.state.showDetails;
        return(
            <View>
                <View style = {[{flexDirection : 'row', alignItems:'center', alignContent:'center'}, common.ml2]}>
                    <Text style = {[common.font_bold, common.font_mid, common.mv2, {width:wp('86%')}]}> { this.props.title } </Text>
                    <IonIcon name = "ios-arrow-down" color = {Colors.darkgray} size = {20}>
                    </IonIcon> 
                </View>
                {/* <View>
                    {renderIf(this.state.status)(
                        <Text style={styles.welcome}>
                        I am dynamic text View
                        </Text>
                    )}
                </View>  */}
            </View>
        );
    }    
}


