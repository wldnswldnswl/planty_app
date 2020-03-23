import React from 'react';
import {Component} from 'react'; 
import { 
     View, 
     Text, 
     TouchableOpacity
    //  RadioButton
} from 'react-native';
import { RadioButton } from 'react-native-paper';

import common from '../../../styles/common'; 
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default class ToDoListItem extends Component{ 

    constructor(props) {
        super(props);
        
        this.state = {
          title: this.props.name,
          color: this.props.color,
          date: this.props.date,
          seq : this.props.seq,
          checked: ""
        };

      }

    checkRadio(checked, seq){
        var checked;

        if(checked == seq){
            this.checked = "#";
        }else {
            this.checked = seq; 
        }  

        return { checked : checked };    
    }

    render(){
        const { checked } = this.state;
        const { seq } = this.state;

        return(
            <TouchableOpacity style = {[common.ml2, {flexDirection : 'row'}, {alignItems : 'center'}]}
                // {() => { 
                //     this.checkRadio.bind(this);
                //     // alert(token.checked);
                //     // this.setState({checked : token});
                // }}
                >
                <View 
                    style ={[{width:widthPercentageToDP('85%')}]}>
                    <Text style = {[common.font_mid, common.mt2, common.font_bold, {color : this.state.color}]}>
                        {this.state.title}
                    </Text>
                    <Text style = {[common.font_small, common.font_darkGray, {color : this.state.color}]}>
                        {this.state.date}
                    </Text>
                </View>
                
                <View>
                <RadioButton 
                        color = {this.state.color}
                        uncheckedColor = {this.state.color}
                        status ={checked == seq ? 'checked' : 'unchecked'}
                        onPress={() => { 
                            if(this.state.checked == seq){
                                this.state.checked = "#";
                            }
                            else {
                                this.state.checked = seq; 
                            }  
                            this.setState({checked : this.state.checked});
                        }}
                />
                </View>
            </TouchableOpacity>
        );
    }
}