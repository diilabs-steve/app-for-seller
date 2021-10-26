import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COMMON_BORDER_RADIUS, COMMON_BOX_SHADOW, COMMON_FONT_SIZE } from '../../../common/enum/commonStyleEnum';

const Card = (props) => {

    const {
        info = {},
        idx,
        state = {},
        title = "",
        subTitle = "",
        count1 = 0,
        count2 = 0,
        count3 = 0,
        setState,
        disabled,
        notBtn = false,
        onPress= () => {},
        style = {},
        modelColWidthPer = 0
    } = props;

    let defaultModelColWidthPer = 55;

    const handlePress = () => {
        setState && setState(info);
        onPress && onPress(info);
    }

    return (
        <TouchableOpacity 
            activeOpacity={!notBtn ? .4 : 1} 
            style={[styles.cardStyle, { opacity: disabled && !notBtn ? .4 : 1, borderWidth: ((state.barcode === info.barcode) && !notBtn) ? 1 : 0, borderColor: "#5759E3"}, style]}
            onPress={disabled ? () => {} : handlePress}
        >
            <View style={{ width: `${!modelColWidthPer ? defaultModelColWidthPer : modelColWidthPer}%` }}>
                <Text style={[styles.cardTextStyle, { opacity: disabled && !notBtn ? .4 : 1, textAlign: "left" }]}>
                    {title}
                </Text>
                {subTitle ?
                <Text style={[styles.cardTextStyle, { opacity: disabled && !notBtn ? .4 : 1, marginTop: 8, textAlign: "left" }]}>
                    {subTitle}
                </Text>
                : <View/>}
            </View>
            <View style={{ width: `${!modelColWidthPer ?  (100 - defaultModelColWidthPer)/3 : (100 - modelColWidthPer)/3}%` }}>
                <Text style={[styles.cardTextStyle, { opacity: disabled && !notBtn ? .4 : 1}]}>
                    {`${count1}`}
                </Text>
            </View>
            <View style={{ width: `${!modelColWidthPer ?  (100 - defaultModelColWidthPer)/3 : (100 - modelColWidthPer)/3}%` }}>
                <Text style={[styles.cardTextStyle, { opacity: disabled && !notBtn ? .4 : 1, color: "#5759E3", fontWeight: "500" }]} >
                    {`${count2}`}
                </Text>
            </View>
            <View style={{ width: `${!modelColWidthPer ?  (100 - defaultModelColWidthPer)/3 : (100 - modelColWidthPer)/3}%` }}>
                <Text style={[styles.cardTextStyle, { opacity: disabled && !notBtn ? .4 : 1}]}>
                    {`${count3}`}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Card;

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: "white",
        width: "100%",
        marginTop: 15,
        borderRadius: COMMON_BORDER_RADIUS,
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        zIndex: 30,
        ...COMMON_BOX_SHADOW
    },
    cardTextStyle: {
        fontSize: COMMON_FONT_SIZE,
        textAlign: "center"
    }
});