import React from 'react';
import {Component} from 'react'; 
// import { 
//      ActionBar
// } from 'react-native'; 
import { Appbar } from 'react-native-paper';
import styles from './style';

export default class MyActionBar extends Component{ 
     render(){ 
        //  const title = this.state;
        //  alert(title);
         return ( 
                <Appbar.Header
                    style = {styles.bar}
                >
                <Appbar.BackAction
                    color = "#fff"
                    size = {35}
                 />
                <Appbar.Content
                    title = {this.props.title}
                    titleStyle = {styles.barText}
                    // style = {styles.barText}
                />
            </Appbar.Header>     
         ); 
     } 
 } 