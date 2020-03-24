import React from 'react';
import {Component} from 'react'; 
// import { 
//      ActionBar
// } from 'react-native'; 
import { Appbar } from 'react-native-paper';
import styles from './style';
import {DrawerActions} from 'react-navigation-drawer';

export default class MyActionBar extends Component{ 



    /*
        name:  gotoSideNav
        description: show Setting Nav
    */
    gotoSideNav(){
         this.props.navigation.dispatch(DrawerActions.openDrawer());
    }

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
                    onPress = {() => this.gotoSideNav.bind(this)}  />
                <Appbar.Content
                    title = {this.props.title}
                    titleStyle = {styles.barText}
                    // style = {styles.barText}
                />
            </Appbar.Header>     
         ); 
     } 
 } 