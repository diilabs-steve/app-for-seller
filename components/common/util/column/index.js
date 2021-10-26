import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { COMMON_COLOR_ENUM } from '../../../common/enum/commonColorEnum';
import { COMMON_BORDER_RADIUS, COMMON_FONT_SIZE, COMMON_SMALL_FONT_SIZE } from '../../../common/enum/commonStyleEnum';

const Column = (props) => {

    const {
        columnInfo = [],
        modelColWidthPer = 0
    } = props;

    let defaultModelColWidthPer = 55;

    return (
        <View style={styles.columnStyle}>
            {columnInfo.map((info = {}, idx) =>
                <Text style={[styles.columnText, { width: info.width ? info.width : idx === 0 ? `${!modelColWidthPer ? defaultModelColWidthPer : modelColWidthPer}%` : `${!modelColWidthPer ?  (100 - defaultModelColWidthPer)/3 : (100 - modelColWidthPer)/3}%`, textAlign: idx === 0 ? "left" : "center" }]}>
                    {info.title}
                </Text>
            )
            }
        </View>
    )
}

export default Column;

const styles = StyleSheet.create({
    columnStyle: {
        height: 49,
        width: "100%",
        backgroundColor: COMMON_COLOR_ENUM.LIGHT_GRAY,
        marginTop: 10,
        borderRadius: COMMON_BORDER_RADIUS,
        flexDirection: "row",
        alignItems: "center",
        padding: 15
    },
    columnText: {
        fontSize: COMMON_SMALL_FONT_SIZE,
        fontWeight: "200"
    },
});