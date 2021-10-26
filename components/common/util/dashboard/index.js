import React from 'react';
import { View, Text, StyleSheet, Platform } from "react-native";
import { COMMON_COLOR_ENUM } from '../../../common/enum/commonColorEnum';
import { COMMON_BORDER_RADIUS, COMMON_FONT_SIZE, COMMON_SMALL_FONT_SIZE } from '../../../common/enum/commonStyleEnum';

const DashBoard = (props) => {
    const {
        dashBoardInfo = [],
        containerStyle = {},
        titleStyle = {},
        contentStyle = {},
        itemStyle = {},
        topTitle,
        topSubTitle
    } = props;
    return (    
        <View style={[styles.dashBoardStyle, { height: (topTitle || topSubTitle) ? Platform.OS === "android" ? 150 : 130 : 113 }, containerStyle]}>
            {(topTitle || topSubTitle) &&
            <View style={{ flexDirection: "row", paddingLeft: 15, paddingBottom: 15 }}>
                {topTitle &&
                <Text style={[styles.dashBoardContent, contentStyle]}>
                    {topTitle}
                </Text>}
                {topSubTitle &&
                <Text style={[{ marginLeft: 10, fontSize: 15, marginTop: 15}, contentStyle]}>
                    {topSubTitle}
                </Text>}
            </View>}

            <View style={{ flexDirection: "row" }}>
                {dashBoardInfo.map((info = {}, idx) => 
                    <View key={`dsh-info-${idx}`} style={[styles.dashBoardItem, { borderLeftWidth: idx !== 0 ? 1 : 0 }, itemStyle]}>
                        <Text style={[styles.dashBoardTitle, titleStyle]}>
                            {info.title}
                        </Text>
                        <Text style={[styles.dashBoardContent, contentStyle]}>
                            {info.content}
                        </Text>
                    </View>
                )
                }
            </View>
        </View>
    )
}

export default DashBoard;

const styles = StyleSheet.create({
    dashBoardStyle: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: COMMON_BORDER_RADIUS,
        justifyContent: "center",
        paddingVertical: 30
    },
    dashBoardTitle: {
        fontSize: COMMON_SMALL_FONT_SIZE,
        color: COMMON_COLOR_ENUM.DARK_GRAY
    },
    dashBoardContent: {
        fontSize: 21.5,
        marginTop: 10,
        fontWeight: "bold"
    },
    dashBoardItem: { 
        width: "33.3%",
        justifyContent: "center",
        alignItems: "center", 
        borderLeftColor: COMMON_COLOR_ENUM.MIDDLE_LIGHT_GRAY
    }
});