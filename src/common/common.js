import React from 'react';
import {Component} from 'react'; 
import {LocaleConfig} from 'react-native-calendars';
import Amplify, {API} from 'aws-amplify';
//공통함수

// export default class Common extends Component{
export function setCalendarConfig(){
        LocaleConfig.locales['kr'] = {
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
            dayNamesShort: ['일','월','화','수','목','금','토'],
            today: '오늘'
          };
        LocaleConfig.defaultLocale = 'kr';
}

export async function getApi(apiName, path) {
  try{
     const data = await API.get(apiName, path,{})
     console.log('data: ', data);
     return data;
  }catch(err){
      console.log('error: ', err);
  }
}

export async function postApi(apiName, path, resources) {
  resources = {
    body: resources
  }
  
  try{
     const data = await API.post(apiName, path, resources)
     console.log('data: ', data);
     return data;
  }catch(err){
      console.log('error: ', err);
  }
 
}
