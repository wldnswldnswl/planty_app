import React from 'react';
import {Component} from 'react'; 
import { 
     View, 
     Text, 
     TouchableHighlight,
     ScrollView,
     AsyncStorage
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Amplify, { API } from 'aws-amplify';

import MyActionBar from  '../MyActionBar';
import ToDoListItem from '../ToDoListItem';
//styles
import common from '../../../styles/common'; 
import styles from './style';
import Colors from '../../../styles/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import DatePicker from '../DatePicker';
import { getApi} from '../../common/common'

 export default class ToDoListScreen extends Component{

     // functions
     constructor(props) {
        super(props);

        this.state = {
            email: "",
            toDoList : []
        } 
       
       
    }

    componentDidMount = async() => {

        await AsyncStorage.getItem("email", (errs,result) => {
            if (!errs) {
                if (result !== null) {
                    this.setState({"email" : result});
                }
             }     
        });

       const path = "/todolist/getAll/" + JSON.parse(this.state.email);
       const response = await API.get("ApiToDoList", path);

        this.setState({toDoList:response});
    }
     /*
        name:  gotoToDoScreen
        description: show ToDo Screen
    */
    gotoToDoScreen(){
        this.props.navigation.navigate("ToDo"/* , { itemId:1 } */); // ** 할일(itemId:1)추가로 이동    
    }

     /*
        name:  gotoSideNav
        description: show Setting Nav
    */
    gotoSideNav(){
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }

    // HomeScreen : 캘린더
     render(){ 
        // alert("email render: "+this.state.email);
      
        //  const title = this.props.navigation.state.params;
        // this.getToDoList =  this.getToDoList.bind("planty.adm@gmail.com");
        return ( 
           <View style = {styles.container}>
               <MyActionBar title = "내 할 일"/>
                   <View style = {styles.nav}> 
                       
               </View>

               <View style = {styles.content}>
                   <ScrollView>
                           {this.state.toDoList&&( 
                                this.state.toDoList.map( (data) => {

                                    return <ToDoListItem name ={data.title} color = {Colors._11} date = {data.end_date}/>
                                })
                           )}
                           
                   </ScrollView>

                   <TouchableHighlight style={[common.addButton]}
                       underlayColor={Colors.clicked} onPress={this.gotoToDoScreen.bind(this)}>
                       <Text style={{fontSize: 50, color: 'white'}}>+</Text>
                   </TouchableHighlight>

               </View>
           </View>            
        );
      
     } 
 } 

