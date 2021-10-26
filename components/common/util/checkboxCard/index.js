import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COMMON_BORDER_RADIUS, COMMON_BOX_SHADOW, COMMON_FONT_SIZE, COMMON_SMALL_FONT_SIZE } from '../../../common/enum/commonStyleEnum';
import CheckedImg from "../../../../assets/checkbox/check.png";
import UnCheckedImg from "../../../../assets/checkbox/uncheck.png";
import { COMMON_COLOR_ENUM } from '../../enum/commonColorEnum';


const CheckboxCard = (props) => {

    const {
        info = {},
        title,
        subTitle,
        smallSubTitle,
        quantity,
        status,
        checked = false,
        disabled,
        notBtn = false,
        onPress= () => {},
        style = {}
    } = props;

    let defaultModelColWidthPer = 45;


    return (
        <TouchableOpacity 
            activeOpacity={!notBtn ? .4 : 1} 
            style={[styles.cardStyle, { opacity: disabled && !notBtn ? .4 : 1, borderWidth: (checked && !disabled && !notBtn) ? 1 : 0, borderColor: "#5759E3"}, style]}
            onPress={(disabled || notBtn) ? () => {} :  () => onPress(info)}
        >
            <View style={{ width: `10%`, marginRight: 10 }}>
                {!notBtn && <CheckBox {...props} />}
            </View>
            <View style={{ width: "90%", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: `60%` }}>
                    <Text style={[styles.cardTextStyle, { opacity: disabled && !notBtn ? .4 : 1, textAlign: "left", fontSize: 21.5, fontWeight: "600" }]}>
                        {title}
                    </Text>
                    {smallSubTitle &&
                    <Text style={[styles.cardTextStyle, { opacity: disabled && !notBtn ? .4 : 1, marginBottom: 0, textAlign: "left", fontSize: 13.5, color: COMMON_COLOR_ENUM.MIDDLE_GRAY }]}>
                        {smallSubTitle}
                    </Text>}
                    {subTitle &&
                    <Text style={[styles.cardTextStyle, { opacity: disabled && !notBtn ? .4 : 1, marginTop: 8, textAlign: "left" }]}>
                        {subTitle}
                    </Text>}
                </View>
                <View style={{ width: `40%`, alignItems: "center" }}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginLeft: 2 }}>
                        <Text style={[styles.cardTextStyle, { opacity: disabled && !notBtn ? .4 : 1, color: COMMON_COLOR_ENUM.MIDDLE_GRAY }]}>
                            수량
                        </Text>
                        <Text style={[styles.cardTextStyle, { opacity: disabled && !notBtn ? .4 : 1, }]}>
                            {` ${quantity}`}
                        </Text>
                    </View>
                    {status &&
                    <Text style={[styles.cardTextStyle, { opacity: disabled && !notBtn ? .4 : 1, marginTop: 8, textAlign: "left", color: "#5759E3" }]}>
                        {status}
                    </Text>}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CheckboxCard;

const CheckBox = (props) => {

    const {
        checked = false
    } = props;

    return (
        <Image source={checked ? CheckedImg : UnCheckedImg} style={{ width: 20, height: 20, resizeMode: "stretch" }} />
    )

}

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
        fontSize: COMMON_SMALL_FONT_SIZE,
        textAlign: "center"
    }
});