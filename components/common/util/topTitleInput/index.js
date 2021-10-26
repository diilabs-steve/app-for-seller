import React from 'react';
import { View, TextInput, StyleSheet, Text } from "react-native";
import { COMMON_COLOR_ENUM } from '../../enum/commonColorEnum';
import { COMMON_FONT_SIZE, COMMON_SMALL_FONT_SIZE } from '../../enum/commonStyleEnum';
import Calendar from '../calendar';
import SignatureComponent from '../signature';

const INPUT_ENUM = Object.freeze({
    INPUT: "input",
    DATE: "date",
    SIGNATURE: "sign"
});

const TopTitleInput = (props) => {

    const {
        state,
        setState,
        placeholder,
        title,
        containerStyle = {},
        type = INPUT_ENUM.INPUT
    } = props;

    return (
        <View style={containerStyle}>
            <Text style={styles.title}>{title}</Text>
            {type === INPUT_ENUM.DATE ?
            <View style={{ position: "relative" }}>
                <Calendar {...props} />
            </View>
            :
            type === INPUT_ENUM.SIGNATURE ?
            <View>
                <SignatureComponent
                    {...props}
                />
            </View>
            :
            <TextInput
                style={[styles.input, { color: state ? "black" : COMMON_COLOR_ENUM.MIDDLE_LIGHT_GRAY }]}
                onChangeText={setState}
                value={state}
                placeholder={placeholder}
            />
        }
        </View>
    );
};

export default TopTitleInput;

const styles = StyleSheet.create({
    input: {
        height: 43,
        borderBottomWidth: 1,
        borderBottomColor: COMMON_COLOR_ENUM.MIDDLE_LIGHT_GRAY,
        width: "100%",
        backgroundColor: "#ffffff",
        lineHeight: 17,
        fontSize: COMMON_FONT_SIZE,
    zIndex:0
  },
  title: {
      fontSize: COMMON_SMALL_FONT_SIZE,
      fontWeight: "500",
      marginBottom: 7,
      color: "#413E52"
  }
})