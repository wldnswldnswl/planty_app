import * as React from 'react';
import { 
  Image,
  View,
  Text
} from 'react-native';
import Colors from '../../styles/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import common from '../../styles/common';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';import ToDoListScreen from './ToDoListScreen';
import SettingScreen from './SettingScreen';
import HomeScreen from './HomeScreen';
import CustomerSupportScreen from './CustomerSupportScreen';


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style = {[{flexDirection : 'column'},{alignItems : 'center'}, common.mv2, common.ml4]}>
      <Image source = {require('../../assets/dry-clean.png')} style={{width: 120, height: 120}} />
        <Text style={[common.font_bold, common.font_mid, common.font_gray, common.mt2,{textAlign:'center',width:wp('100%')}]}>
            NickName
        </Text>
      {/* 클릭가능한 버전(Drawer의 컴포넌트) */}
      {/* <DrawerItem
        label="NickName"
        activeTintColor = "white"
        labelStyle = {[common.font_bold, common.font_mid]}
      /> */}
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function App() {
  
  return (
      <Drawer.Navigator 
        drawerContent={props => <CustomDrawerContent {...props} />}
        initialRouteName = "Home"
        backBehavior = "initialRoute" 
        drawerContentOptions = {
          {
            activeTintColor : Colors.darkPrimary
          }
        } >
        <Drawer.Screen name="Home" component={HomeScreen}  
          options = {
            {
              drawerLabel:"내 캘린더",
              drawerIcon: (({focused}) => <Icon name="calendar" size={20} color={Colors.darkPrimary} />)  // 위클리: "calendar-o"
          
            }
          }
        />
        <Drawer.Screen name="ToDoList" component={ToDoListScreen} 
          options = {
            {
              drawerLabel:"할 일 목록",
              drawerIcon: (({focused}) => <Icon name="list-ul" size={20} color={Colors.darkPrimary} />),
            }
          }
        />
        <Drawer.Screen name="Support" component={CustomerSupportScreen} 
          options = {
            {
              drawerLabel:"고객지원",
              drawerIcon: (({focused}) => <Icon name="question-circle-o" size={24} color={Colors.darkPrimary} />)
            }
          }
        />
        <Drawer.Screen name="Setting" component={SettingScreen} 
          options = {
            {
              drawerLabel:"설정",
              drawerIcon: (({focused}) => <IonIcon name="ios-settings" size={28} color={Colors.darkPrimary} />)
            }
          }
        />
      </Drawer.Navigator>
  );
}