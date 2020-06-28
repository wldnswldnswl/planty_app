import React from 'react';
import { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import MyActionBar from '../../MyActionBar';

//styles
import common from "../../../../styles/common";
import Colors from "../../../../styles/colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './styles'

export default class ContentsScreen extends Component {

    // functions
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.route.params.title,
            description: this.props.route.params.description,
            nav: this.props.route.params.nav,
            route: this.props.route.params.route
        }

        // console.log(props);
    }
    // 고객지원 화면
    render() {
        return (
            <View style={styles.container}>

                <MyActionBar title={this.state.title} back={true} support = {true} prev={this.props} />

                <View style={[styles.content, common.ml4, common.mt4]}>
                    <Text style={[common.font_bold, common.font_title]}>
                        {this.state.title}
                    </Text>
                    <View style = {common.ml2}>
                        <Text style={[common.mt2_5, common.font_mid]}>{this.state.description}</Text>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate(this.state.route,
                            {   isNew:true,
                                year: new Date().getFullYear(),
                                month: new Date().getMonth() + 1,
                                date: new Date().getDate(),
                                day: new Date().getDay()
                            }); }} ><Text style={[common.mt2, common.font_mid_small, { color: Colors.darkPrimary, borderBottomColor: Colors.darkPrimary }]}>
                            {this.state.nav}화면으로 이동</Text></TouchableOpacity>
                    </View>

                </View>
            </View>


        );
    }
} 
