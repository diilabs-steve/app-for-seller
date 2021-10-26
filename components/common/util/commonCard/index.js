import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COMMON_BORDER_RADIUS, COMMON_BOX_SHADOW, COMMON_FONT_SIZE } from '../../../common/enum/commonStyleEnum';
import { COMMON_COLOR_ENUM } from '../../enum/commonColorEnum';

const CommonCard = (props) => {

    const {
        info = {},
        title,
        titleStyle,
        subTitle,
        subTitleStyle,
        label,
        labelStyle,
        checked = false,
        disabled,
        notBtn = false,
        onPress= () => {},
        style = {},
        childrenCtStyle = {},
        children
    } = props;

    let defaultModelColWidthPer = 45;


    return (
        <TouchableOpacity 
            activeOpacity={!notBtn ? .4 : 1} 
            style={[styles.cardStyle, { opacity: disabled && !notBtn ? .4 : 1, borderWidth: (checked && !disabled && !notBtn) ? 1 : 0, borderColor: "#5759E3"}, style]}
            onPress={disabled ? () => {} :  () =>{ 
                console.log("info", info)
                onPress(info)
            }}
        >
            <View style={{ width: "100%" }}>
                <Text style={[styles.cardTextStyle, { opacity: disabled && !notBtn ? .4 : 1, textAlign: "left", fontSize: 21.5, fontWeight: "600" }, titleStyle]}>
                    {title}
                </Text>
                <View style={{ flexDirection: "row" }}>
                    {subTitle &&
                    <Text style={[styles.cardTextSubStyle, { opacity: disabled && !notBtn ? .4 : 1, marginTop: 4, textAlign: "left", color: COMMON_COLOR_ENUM.MIDDLE_GRAY }, subTitleStyle]}>
                        {subTitle}
                    </Text>}
                    {label &&
                    <Text style={[styles.cardTextSubStyle, { opacity: disabled && !notBtn ? .4 : 1, marginTop: 4, textAlign: "left", color: "#5759E3", marginLeft: 10 }, labelStyle]}>
                        {label}
                    </Text>}
                </View>
            </View>
            <View style={childrenCtStyle}>
                {children}
            </View>
        </TouchableOpacity>
    )
}

export default CommonCard;

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: "white",
        width: "100%",
        borderRadius: COMMON_BORDER_RADIUS,
        padding: 15,
        marginTop: 15,
        zIndex: 30,
        ...COMMON_BOX_SHADOW,
    },
    cardTextStyle: {
        fontSize: COMMON_FONT_SIZE
    },
    cardTextSubStyle: {
        fontSize: 13.5
    }
});