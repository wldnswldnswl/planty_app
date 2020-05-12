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
            email: null,
            toDoList : []
        }

        // getSession
       //  AsyncStorage.multiGet(['email', 'password']).then((data) => {
         AsyncStorage.multiGet(['email']).then((data) => {
            let email_session = data[0][1];
            // let password = data[1][1];

            if (email_session != null)
                this.state.email = email_session;
         });
        //  this.state.toDoList = this.getToDoList.bind(this);
        this.getToDoList = this.getToDoList.bind(this);

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

    async getToDoList(){
      const response = await getApi("ApiToDoList","/todolist/"+this.state.email);

       var toDoList = [];

       response.forEach(function(data, index){
           const name = data.title;
           const description = data.description == null ? "" : data.description;
           const end_date = data.end_date;
           const color = data.color;

           toDoList.push(<ToDoListItem name = {data.title} color = {Colors._3} date = {data.end_date} seq = {index}/>);
       })

       console.log(toDoList)
       this.state.toDoList = toDoList;
    }


    // HomeScreen : 캘린더
     render(){ 

        //  const title = this.props.navigation.state.params;
         return ( 
            <View style = {styles.container}>
                <MyActionBar title = "내 할 일"/>
                    <View style = {styles.nav}> 
                        
                </View>

                <View style = {styles.content}>
                    <ScrollView> 
                        <ToDoListItem name = "밥먹기" color = {Colors._10} date = "03.12" />
                        {this.state.toDoList}
                        {/* {this.state.toDoList.map(function (result) {
                        return <ListItem name ={result.title} color = {Colors._11} date = {result.end_date}/>;
                        })} */}
                        {/* for문으로 모든 데이터 불러오기, ListItem 동적생성 */}
                        {/* <ListItem name = "오픽 공부하기" color = {Colors._3} date = "03.11" seq = "1"/>
                        <ListItem name = "밥먹기" color = {Colors._10} date = "03.12" />
                        <ListItem name = "영양제 먹기" color = {Colors._11} date = "03.13" /> */}
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
