import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { COMMON_COLOR_ENUM } from '../../enum/commonColorEnum';
import { COMMON_BORDER_RADIUS, COMMON_FONT_SIZE, COMMON_SMALL_FONT_SIZE } from '../../enum/commonStyleEnum';
import Title from '../title';

const ITEM_SIZE_ENUM = Object.freeze({
    DEFAULT: "default",
    SMALL: "small"
})

const RecommendLocationItem = (props) => {

    const {
        location = "",
        loadingRate = "",
        onlyQty = "",
        quantity = "",
        size = ITEM_SIZE_ENUM.DEFAULT,
        idx = 0,
        style = {}
    } = props;

    const getBgColor = (idx) => {

        switch (idx) {
            case 1:
                return "#CCEDED";
            case 2:
                return "#CCEDED";
            default:
                return "#B2E7E7";
        }
    }

    return (
        <View style={[styles.recommendItem, { 
            backgroundColor: getBgColor(idx), 
            width: size === ITEM_SIZE_ENUM.DEFAULT ? 110 : 83.83, 
            height: size === ITEM_SIZE_ENUM.DEFAULT ? 110 : 83.83,
            paddingHorizontal: size === ITEM_SIZE_ENUM.DEFAULT ? 18 : 5,
            paddingVertical: size === ITEM_SIZE_ENUM.DEFAULT ? 18 : 14,
        }, style]}>
            <Title style={{ color: "#1DAFAF", fontSize: size === ITEM_SIZE_ENUM.DEFAULT ? 23 : 19 }}>
                {location}
            </Title>
            {onlyQty ?
            <Text style={[styles.qty, { fontSize: 13.5, marginTop: "9%" }]}>
                {` ${onlyQty}개`}
            </Text>
            : <View/>}
            {loadingRate ?
            <View style={[{ flexDirection: "row", alignItems: "center", marginTop: "9%" }]}>
                <Text style={[styles.qtyTitle, styles.recommendSubtitle]}>
                    적재율
                </Text>
                <Text style={[styles.qty, styles.recommendQty]}>
                    {` ${loadingRate}%`}
                </Text>
            </View> : <View/>}
            {quantity ?
            <View style={[{ flexDirection: "row", alignItems: "center", marginTop: "4%" }]}>
                <Text style={[styles.qtyTitle, styles.recommendSubtitle]}>
                    수량
                </Text>
                <Text style={[styles.qty, styles.recommendQty]}>
                    {` ${quantity}`}
                </Text>
            </View> : <View/>}
        </View>
    )
}

export default RecommendLocationItem;

const styles = StyleSheet.create({
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
    recommendItem: {
        borderRadius: COMMON_BORDER_RADIUS,
        padding: 18,
        alignItems: "center"
    },
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