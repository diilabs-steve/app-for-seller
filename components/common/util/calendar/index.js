import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, TextInput, View, Pressable, Text } from "react-native";
import { Datepicker, NativeDateService, Button } from '@ui-kitten/components';
import { COMMON_FONT_SIZE } from '../../enum/commonStyleEnum';
import { COMMON_COLOR_ENUM } from '../../enum/commonColorEnum';
import { spliteDateNTime } from '../../../../functions/dateObjFunc';
// import { getFormDate } from '../../../../function/dateObjFunc';

const Calendar = (props) => {

    /**
     * state
     */

    /**
     * props
     */
    const { style, selectDate, state, setState, placeholder, title, labelWidth, contentWidth, labelTextStyle = {} } = props;

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
            <View style={{ position: "relative" }}>
                <Pressable
                    onPress={() => dateRef.current.onPress()}
                    style={{ zIndex: 10 }}
                >
                    <View style={styles.input}>
                        <Text style={[styles.text, { color: state ? "black" : COMMON_COLOR_ENUM.MIDDLE_GRAY}]}>
                            {state ? spliteDateNTime(state.toISOString()).date : placeholder}
                        </Text>
                    </View>
                </Pressable>
            </View>
            <Datepicker
                ref={dateRef}
                style={{ display: "none" }}
                min={new Date("1990-01-01")}
                date={state}
                dateService={dateService}
                onSelect={nextDate => {
                    // 그리니치 타임존 + 9시간 = 한국시간
                    nextDate.setTime(nextDate.getTime() + (9 * 60 * 60 * 1000));
                    console.log(nextDate);
                    setState && setState(nextDate);
                    selectDate && selectDate(nextDate);
                }}
            />
        </>
    )
}

export default Calendar;

const styles = StyleSheet.create({
    input: {
        height: 37,
        borderBottomWidth: 1,
        borderBottomColor: COMMON_COLOR_ENUM.MIDDLE_LIGHT_GRAY,
        width: "100%",
        color: COMMON_COLOR_ENUM.MIDDLE_GRAY,
        backgroundColor: "#ffffff",
        paddingBottom: 10,
        // lineHeight: 18,
        fontSize: COMMON_FONT_SIZE,
        zIndex: 0
    },
    text: {
        color: COMMON_COLOR_ENUM.MIDDLE_GRAY,
        fontSize: COMMON_FONT_SIZE,
        opacity: 0.7,
        marginTop: 4
    }
})