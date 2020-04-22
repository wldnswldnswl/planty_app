import React from 'react';
import {Component} from 'react'; 
import {LocaleConfig} from 'react-native-calendars';
import Amplify, {API} from 'aws-amplify';
//공통함수

// export default class Common extends Component{
export function setCalendarConfig(){
        LocaleConfig.locales['kr'] = {
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            // monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
            dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
            dayNamesShort: ['일','월','화.','수','목','금','토'],
            today: '오늘'
          };
        LocaleConfig.defaultLocale = 'kr';
}

export function getDateString(year, day, month, date, minute, hour){

    var final_date;

    // 요일 저장하는 변수 생성
    var ko_day;
    // 월 글자 수 맞추기 위한 변수 생성
    var month_len;
    // 일 글자 수 맞추기 위한 변수 생성
    var date_len;
    // 시간 글자 수 맞추기 위한 변수 생성
    var hour_len;
    // 분 글자 수 맞추기 위한 변수 생성
    var minute_len;
    // 오전,오후 구분 위한 변수 생성
    var am_pm;

    //day값에 따라 요일 설정
    switch (day) {
      case 0: ko_day = "일";
          break;
      case 1: ko_day = "월";
          break;
      case 2: ko_day = "화";
          break;
      case 3: ko_day = "수";
          break;
      case 4: ko_day = "목";
          break;
      case 5: ko_day = "금";
          break;
      case 6: ko_day = "토";
          break;
  }

  //1~9월을 두자릿수로 설정
  if (month < 10)
      month_len = "0";
  else
      month_len = "";

  //한자릿수 일을 두자릿수로 설정
  if (date < 10)
      date_len = "0";
  else
      date_len = "";

  //한자릿 수 분을 두자릿수로 설정
  if (minute < 10)
      minute_len = "0";
  else
      minute_len = "";

  //오전,오후 구분
  if (hour < 12) {
      am_pm = "오전";
      if (hour == 0) {
          hour += 12;
          hour_len = "";
      }
      hour_len = "0";
  }
  else if (hour < 24) {
      am_pm = "오후";
      hour -= 12;
      hour_len = "0";
  }
  else {
      am_pm = "오전";
      hour -= 12;
      hour_len = "";
  }

  final_date = year+"."+month_len+""+month+"."+date_len+""+date+"("+ko_day+") "+ am_pm+" "+ hour_len+""+hour+":"+minute_len+""+minute;
  
//   alert("pass: "+ JSON.stringify(final_date));
  return final_date;
}

export async function getApi(apiName, path, params, success, fail) {
  resources = {
    body: params
  }
  try{
     const data = await API.get(apiName, path, resources);
     if(success != null) alert(success);
     console.log('data: ', data);
     return data;
  }catch(err){
      if(fail != null) alert(fail);
      console.log('error: ', err);
  }
}

export async function postApi(apiName, path, params, success, fail) {
  resources = {
    body: params
  }
  
  try{
     const data = await API.post(apiName, path, resources);

     if(success != null) alert(success); //성공메시지

     console.log('succeses: ', data);

     return data;

  }
  catch(err){
      if(fail != null) alert(fail); //실패메시지

      console.log('error: ', err);
  }
 
}
