import React from 'react';
import { Text, TextInput, StyleSheet, TouchableWithoutFeedback, View, Image } from "react-native";
import SearchImg from "../../../assets/input/search.png";
import ScanImg from "../../../assets/button/scan.png";
import CustomButton from '../util/customButton';
import { COMMON_NAVIGATE_ENUM } from '../../../navigationVar';
import { COMMON_BORDER_RADIUS, COMMON_BOX_SHADOW, COMMON_SMALL_FONT_SIZE } from '../enum/commonStyleEnum';

const SIZE_ENUM = Object.assign({
    DEFAULT: "default",
    BIG: "big"
})

const Presenter = (props) => {

    const {
        placeholder = "",
        onPress,
        state,
        setState,
        handleBarcodeBtn,
        style,
        size = SIZE_ENUM.DEFAULT,
        inputStyle = {},
        btnStyle = {},
        scopeIconNone = false,
        onChangeText = () => {},
        keyboardType,
        inputWidth,
        btnVisible = true
    } = props;

    return (
        <>
        <View style={[styles.container, style]}>
            {!scopeIconNone && <Image source={SearchImg} style={styles.searchImg} />}
            <View style={[{ width: inputWidth ? inputWidth : size === SIZE_ENUM.BIG ? "79%" : "82%", zIndex: 0 }]}>
                <TextInput
                    style={[styles.input, { height: size === SIZE_ENUM.BIG ? 80 : 60, paddingLeft: scopeIconNone ? 20 : 50 }, inputStyle]}
                    onChangeText={(nextText) => {
                        setState(nextText);
                        onChangeText(nextText);
                    }}
                    keyboardType={keyboardType}
                    onSubmitEditing={onPress}
                    value={state}
                    placeholder={placeholder}
                />
            </View>
            <View style={{ width: "18%", marginLeft: "2%", justifyContent: "space-between" }}>
                {btnVisible &&
                <CustomButton
                    btnStyle={[styles.scanBtn, { height: size === SIZE_ENUM.BIG ? 80 : 60, width: size === SIZE_ENUM.BIG ? 80 : 60}, btnStyle]}
                    title={<Image source={ScanImg} style={styles.scanImg} />}
                    onPress={handleBarcodeBtn}
                />}
            </View>
        </View>
        </>
    );
};

export default Presenter;


const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 10,
    borderRadius: COMMON_BORDER_RADIUS,
    width: "100%",
    backgroundColor: "#ffffff",
    ...COMMON_BOX_SHADOW,
    fontSize: COMMON_SMALL_FONT_SIZE,
    zIndex:0
  },
  container: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  searchImg: { width: 20, height: 20, resizeMode: "stretch", position: "absolute", zIndex: 90, marginLeft: 20 },
  scanImg: { width: 20, height: 20, resizeMode: "stretch" },
  scanBtn: {
      backgroundColor: "#E5E5E5",
      borderRadius: COMMON_BORDER_RADIUS,
      width: 60,
      height: 60,
        ...COMMON_BOX_SHADOW
  }
});