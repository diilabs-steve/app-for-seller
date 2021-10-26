import React from "react";
import { Text, View, StyleSheet } from "react-native"
import { Button } from '@ui-kitten/components';
import { KITTEN_BUTTON_APPEARANCE_ENUM, KITTEN_BUTTON_SIZE_ENUM } from "../../enum/kittenButtonEnum";
import { COMMON_COLOR_ENUM } from "../../enum/commonColorEnum";

const KittenButton = (props) => {

    const { title, style, onPress, status, size, appearance, accessoryLeft, accessoryRight, left, right, disabled} = props;

    return (
        <Button 
            accessoryLeft={() => left ? <View style={btnStyles.left}>{left}</View> : accessoryLeft ? accessoryLeft : <View></View>}
            accessoryRight={() => right ? <View style={btnStyles.right}>{right}</View> : accessoryRight ? accessoryRight : <View></View>}
            disabled={disabled}
            style={[ { borderRadius: 7 }, style ]} 
            status={status} 
            size={size ? size : KITTEN_BUTTON_SIZE_ENUM.MEDIUM} 
            appearance={appearance ? appearance : KITTEN_BUTTON_APPEARANCE_ENUM.FILLED}
            onPress={onPress}
        >
            {title}
        </Button>
    )
}

export default KittenButton;


export const btnStyles = StyleSheet.create({
    left: {
        left: 10, position: "absolute"
    },
    right: {
        right: 10, position: "absolute"
    }
});