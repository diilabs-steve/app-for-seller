import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COMMON_COLOR_ENUM } from '../../enum/commonColorEnum';
import { COMMON_BORDER_RADIUS, COMMON_FONT_SIZE } from '../../enum/commonStyleEnum';

const CustomButton = (props) => {
    const {
        title,
        btnStyle = {},
        textStyle = {},
        onPress,
        disabled
    } = props;
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: disabled ? "#D9DEE7" : COMMON_COLOR_ENUM.PRIMARY }, btnStyle]} onPress={!disabled && onPress ? onPress : () => {}} activeOpacity={disabled ? 1 : 0.7} >
            {typeof title === "string" ?
                <Text style={[styles.text, textStyle]}>
                    {title}
                </Text>
                :
                title
            }
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COMMON_COLOR_ENUM.PRIMARY,
        width: "100%",
        height: 52,
        borderRadius: COMMON_BORDER_RADIUS
    },
    text: {
        color: "white",
        fontSize: COMMON_FONT_SIZE,
        fontWeight: "500"
    }
})