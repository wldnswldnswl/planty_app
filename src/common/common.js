import React from 'react';
import {Component} from 'react'; 
import {LocaleConfig} from 'react-native-calendars';

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
// }
