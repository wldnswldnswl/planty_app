import React from 'react';
import { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import common from '../../../styles/common'; // common styles
import styles from './style';
import MyActionBar from '../MyActionBar'

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
           
        }


    }

    //functions  
 
    /*
       Login Screen
    */
    render() {
        return (
            <View style={styles.container}>
                <MyActionBar title="공지사항"  back={true} support = {false} prev={this.props} />
                   
                <View style={styles.content}>
                    <Text>PLANTY 버전 1 안내</Text>
                </View>
            </View>            
        );
    }
}

