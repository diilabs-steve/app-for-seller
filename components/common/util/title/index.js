import React from 'react';
import { StyleSheet, Text } from "react-native";

const Title = (props) => {

    const {
        children,
        style = {}
    } = props;

    return (
        <Text style={[styles.defaultStyle, style]}>
            {children}
        </Text>
    );
};

export default Title;

const styles = StyleSheet.create({
    defaultStyle: {
        fontSize: 20,
        fontWeight: "700"
    }
});