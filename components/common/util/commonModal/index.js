import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { COMMON_COLOR_ENUM } from "../../enum/commonColorEnum";
import { KITTEN_BUTTON_SIZE_ENUM, KITTEN_BUTTON_STATUS_ENUM } from "../../enum/kittenButtonEnum";
import CloseImg from "../../../../assets/modal/close_popup.png"
import KittenButton from "../kittenButton";
import { COMMON_BORDER_RADIUS, COMMON_BOX_SHADOW } from "../../enum/commonStyleEnum";
import CustomButton from "../customButton";

const CommonModal = (props) => {

    const { visible = false, setVisible, children, yBtnCallBack, nBtnCallBack, useYn = false, useClose = false, yTitle, nTitle, yBtnStyle = {}, nBtnStyle = {}, disabled } = props;

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {useClose &&
            <TouchableOpacity 
              onPress={() => {
                  setVisible(false);
                  nBtnCallBack && nBtnCallBack();
              }}            
              style={styles.closeBtnPosition}>
              <Image source={CloseImg} style={styles.closeImg} />
            </TouchableOpacity>}
            {children}
            <View style={{ flexDirection: "row", justifyContent: useYn ? "space-between" : "center", alignItems: "center" }}>
              {useYn &&
              <CustomButton
                title={nTitle ? nTitle : "취소"}
                onPress={() => {
                  setVisible(false);
                  nBtnCallBack && nBtnCallBack();
                }}
                btnStyle={[{ width: "49%", marginTop: 3, backgroundColor: "#E9EDF2" }, nBtnStyle]}
                textStyle={{ color: COMMON_COLOR_ENUM.PRIMARY, fontWeight: "600" }}
              />}
              <CustomButton
                title={yTitle ? yTitle : "확인"}
                onPress={() => {
                  setVisible(false);
                  yBtnCallBack && yBtnCallBack();
                }}
                btnStyle={[{ width: "49%" }, yBtnStyle]}
                disabled={disabled}
              />
            </View>
          </View>

        </View>
        <View style={styles.bgShadowEffect}></View>
      </Modal>
    </>
  )
};

export default CommonModal;


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
    marginTop: 22,
    zIndex: 100
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
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
  },
  closeImg: { width: 25, height: 25, resizeMode: "stretch" },
  closeBtnPosition: { position: "absolute", right: 25, top: 25, zIndex: 70 },
  bgShadowEffect: { position: "absolute", zIndex: 90, opacity: 0.6, backgroundColor: "black", width: "100%", height: "100%" }
});

