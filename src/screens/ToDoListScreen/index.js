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
        
      
        // console.log(this.state.email);

        // this.getToDoList = this.getToDoList.bind(this);
       
    }

    componentWillMount(){

        console.log("start");
        // getSession
        // var value =  AsyncStorage.getItem('email');
        //    value.then((e)=>{
        //      this.setState({
        //       email: e.name
        //      })
        //    })

        AsyncStorage.getItem('email', (errs,result) => {
            if (!errs) {
                if (result !== null) {
                    this.setState({email:result});
                }
             }
        });

        //  console.log("dddddd",this.state.email);
        this.getToDoList = this.getToDoList.bind(this.state.email);
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

    async getToDoList(email){
      const response = await getApi("ApiToDoList","/todolist/"+this.state.email);

      console.log("response:",response);
       var toDoList = [];

       response.forEach(function(data, index){
           const name = data.title;
           const description = data.description == null ? "" : data.description;
           const end_date = data.end_date;
           const color = data.color;

        //    console.log(data);
           toDoList.push(<ToDoListItem name = {data.title} color = {Colors._3} date = {data.end_date} seq = {index}/>);
       })

    //    console.log("hh:",toDoList);
       this.state.toDoList = toDoList;
    }

    makeItems = () => {
        console.log(this.state.toDoList)
    }

    // HomeScreen : 캘린더
     render(){ 

        // console.log("email render: ",this.state.email);
        // this.getToDoList(this.state.email);
        //  const title = this.props.navigation.state.params;
         return ( 
            <View style = {styles.container}>
                <MyActionBar title = "내 할 일"/>
                    <View style = {styles.nav}> 
                        
                </View>

                <View style = {styles.content}>
                    <ScrollView>

                        <ToDoListItem name = "밥먹기" color = {Colors._10} date = "03.12" />
                        {this.state.toDoList[0]}
                        {/* data = {this.state.toDoList}
                        renderItem = { ({item}) =>(
                            <ListItem name ={result.title} color = {Colors._11} date = {result.end_date}/>
                        )}  */}
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
