import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { COMMON_COLOR_ENUM } from "../../enum/commonColorEnum";
import { KITTEN_BUTTON_SIZE_ENUM, KITTEN_BUTTON_STATUS_ENUM } from "../../enum/kittenButtonEnum";
import WarningImg from "../../../../assets/modal/warning.png"
import KittenButton from "../kittenButton";
import { COMMON_BORDER_RADIUS, COMMON_BOX_SHADOW, COMMON_SMALL_FONT_SIZE } from "../../enum/commonStyleEnum";
import CommonModal from "../commonModal";
import Title from "../title";

const AlertModal = (props) => {

    const { visible, setVisible, textAlign = "center", message, subMessage, midMessage, yBtnCallBack, nBtnCallBack, useYn = false } = props;

  return (
    <>
      <CommonModal {...props}>
          {/* <View style={{ alignItems: "center" }}>
              <Image source={WarningImg} style={{ width: 38, height: 35, resizeMode: "stretch" }} />
          </View> */}
          {message ? typeof message === "string" ?
              <Title style={{ textAlign, fontSize: 21, fontWeight: "700", marginTop: 30, marginBottom: midMessage ? 0 : 20 }}>
                  {message}
              </Title>
              :
              message
              : <View/>
          }
          {midMessage ?
            <Title style={{ fontSize: COMMON_SMALL_FONT_SIZE, marginBottom: 30, marginTop: 10, textAlign }}>
              {midMessage}
            </Title> : <View/>
          }
          {subMessage ?
            <Text style={{ fontSize: COMMON_SMALL_FONT_SIZE, color: COMMON_COLOR_ENUM.DEEP_DARK_GRAY, marginBottom: 40, textAlign }}>
              {subMessage}
            </Text> : <View/>
          }
      </CommonModal>
    </>
  )
};

export default AlertModal;


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
    zIndex: 100
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: COMMON_BORDER_RADIUS,
    padding: 35,
    ...COMMON_BOX_SHADOW
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600"
  }
});

