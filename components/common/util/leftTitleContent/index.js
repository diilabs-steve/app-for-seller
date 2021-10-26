import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COMMON_COLOR_ENUM } from "../../enum/commonColorEnum";
import { COMMON_FONT_SIZE, COMMON_SMALL_FONT_SIZE } from "../../enum/commonStyleEnum";

const LeftTitleContent = (props) => {

    const { title, content, contentStyle, titleStyle, containerStyle } = props;

    
    return (
        <View style={[styles.container, containerStyle]}>
                <Text style={[styles.defaultTitle, styles.defaultTxt, titleStyle]}>
                    {title}
                </Text>
            <View style={[styles.defaultContent, contentStyle]}>
                {typeof content === "string" ?
                    <Text style={[styles.defaultTxt, { fontWeight: "400" }]}>
                        {content}
                    </Text>
                    :
                    content
                }
            </View>
        </View>
    )
}

export default LeftTitleContent;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 15,
        alignItems: "center",
        width: "100%"
    },
    defaultTitle: { width: "40%", color: COMMON_COLOR_ENUM.DARK_GRAY },
    defaultContent: { width: "60%" },
    defaultTxt: {
        fontSize: COMMON_SMALL_FONT_SIZE
    }
});