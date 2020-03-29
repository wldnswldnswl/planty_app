import {StyleSheet} from 'react-native'

import colors from  'react-native-datepicker-modal/config/colors'
import spacing from 'react-native-datepicker-modal/config/spacing'
import fontSize from 'react-native-datepicker-modal/config/fontSize'

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.gray.dark,
      borderBottomColor: colors.gray.veryLight,
      borderBottomWidth: 1,
      marginVertical: spacing[1],
      marginHorizontal: spacing[0],
      justifyContent: 'center',
      borderRadius: 2,
      height: 50
    },
    placeholderText: {
      color: colors.gray.light
    },
    text: {
      width: '100%',
      paddingHorizontal: spacing[1],
      paddingVertical: spacing[0],
      fontFamily: 'Montserrat',
      fontSize: fontSize.medium,
      color: colors.gray.dark
    }
  })

  export default styles;