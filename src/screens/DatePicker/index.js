import React from 'react';
import {  Text } from 'react-native';
import styles from './style';

import ModalDatePicker from 'react-native-datepicker-modal';



    //시작일, 종료일 선택하는 달력화면
    const DatePicker = ({ style, ...props }) => (
        <ModalDatePicker
          style={[styles.container, style]}
          renderDate={({ year, month, day, date }) => {
            if (!date) {
              return <Text style={[styles.text, styles.placeholderText]}>date of birth</Text>
            }
      
            const dateStr = `${day}-${month}-${year}`
            return <Text style={styles.text}>{dateStr}</Text>
          }}
          {...props}
        />
      )

export default DatePicker





