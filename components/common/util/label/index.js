import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COMMON_COLOR_ENUM } from '../../enum/commonColorEnum';
import { COMMON_BORDER_RADIUS, COMMON_FONT_SIZE, COMMON_SMALL_FONT_SIZE } from '../../enum/commonStyleEnum';

const Label = (props) => {

    const  {
        title = "", 
        content = "",
        subText = "",
        style = {},
        backgroundColor
    } = props;
    return (
        <View style={[styles.labelContent, { backgroundColor: backgroundColor ? backgroundColor : COMMON_COLOR_ENUM.LIGHT_BLUE }, style]}>
            <Text style={[styles.text, { fontWeight: "500" }]}>
                {title}
            </Text>
            <Text style={[styles.text, { fontWeight: "300", marginLeft: 3 }]}>
                {`${content}${subText}`}
            </Text>
        </View>
    );
};

export default Label;

const styles = StyleSheet.create({
    labelContent: {
        flexDirection: "row", 
        backgroundColor: COMMON_COLOR_ENUM.LIGHT_BLUE, 
        paddingVertical: 5, 
        paddingHorizontal: 10, 
        borderRadius: 20,
        justifyContent: "center",
        // maxWidth: 100
    },
    text: {
        fontSize: 14,
        color: "white"
    }
});