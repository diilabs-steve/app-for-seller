import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { COMMON_COLOR_ENUM } from '../../enum/commonColorEnum';
import { COMMON_FONT_SIZE, COMMON_SMALL_FONT_SIZE } from '../../enum/commonStyleEnum';

const TitleQuantity = (props) => {

    const {
        title1 = "",
        quantity1 = "",
        title2 = "",
        quantity2 = "",
        style = {},
        quantity1Style = {},
        quantity2Style = {}
    } = props;


    return (
        <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
            <Text style={styles.qtyTitle}>
                {title1}
            </Text>
            <Text style={[styles.qty, quantity1Style]}>
                {` ${quantity1}개`}
            </Text>
            {title2 || quantity2 ?
            <>
            <View style={styles.divider}><Text></Text></View>
            <Text style={styles.qtyTitle}>
                {title2}
            </Text>
            <Text style={[styles.qty, quantity2Style]}>
                {` ${quantity2}개`}
            </Text>
            </> : <View/>}
        </View>
    )
}

export default TitleQuantity;


const styles = StyleSheet.create({
    subTitle: { fontSize: 19, marginLeft: 5 },
    qtyTitle: {
        fontSize: COMMON_SMALL_FONT_SIZE,
        fontWeight: "300",
        color: COMMON_COLOR_ENUM.DEEP_DARK_GRAY
    },
    qty: {
        fontSize: COMMON_FONT_SIZE,
        bottom: .5
    },
    divider: { borderLeftWidth: 1, borderLeftColor: "#D9DEE7", marginHorizontal: 5 },
    recommendSubtitle: { fontSize: 13.5, width: 40, textAlign: "left" },
    recommendQty: { fontSize: 13.5, width: 33 },
    deleteImg: { width: 12, height: 12, resizeMode: "stretch" },
    deleteBtn: {
        width: 24,
        height: 24,
        backgroundColor: COMMON_COLOR_ENUM.LIGHT_BLUE,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    }

});