import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Datepicker, NativeDateService, Button } from '@ui-kitten/components';
import { getFormDate } from '../../../../functions/dateObjFunc';
// import { getFormDate } from '../../../../function/dateObjFunc';

/**
 * styles
 */
const styles = StyleSheet.create({

});


const LabelKittenCalendar = (props) => {

  /**
   * state
   */

  /**
   * props
   */
  const { style, selectDate, date, setDate, title, labelWidth, contentWidth, labelTextStyle = {} } = props;

  /**
   * useEffect
   */

  /**
   * const
   */
  const dateRef = useRef();
  const i18n = {
    dayNames: {
      short: ['일', '월', '화', '수', '목', '금', '토'],
      long: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    },
    monthNames: {
      short: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      long: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    },
  };

  /**
   * methods
   */
  const dateService = new NativeDateService('en', { i18n, format: 'YYYY-MM-DD' });




  /**
   * render
   */
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: labelWidth, justifyContent: "center" }}>
          <Text style={[labelTextStyle, { textAlign: "center", fontSize: labelTextStyle.fontSize ? labelTextStyle.fontSize : 16, fontWeight: "600" }]}>
            {title}
          </Text>
        </View>
        <View style={{ width: contentWidth }}>
          <Button
            style={{ backgroundColor: "#f4f5f7", justifyContent: "flex-start", borderColor: "white", height: 45, borderRadius: 8 }}
            onPress={() => dateRef.current.onPress()}
            children={() =>
              <Text>
                {getFormDate(date, "-")}
              </Text>
            }
            value={getFormDate(date, "-")}
          />
        </View>
      </View>
      <Datepicker
        ref={dateRef}
        style={{ display: "none" }}
        min={new Date("1990-01-01")}
        date={date}
        dateService={dateService}
        onSelect={nextDate => {
          // 그리니치 타임존 + 9시간 = 한국시간
          nextDate.setTime(nextDate.getTime() + (9 * 60 * 60 * 1000));
          // console.log(nextDate);
          setDate && setDate(nextDate);
          selectDate && selectDate(nextDate);
        }}
      />
    </>
  )
}

export default LabelKittenCalendar;