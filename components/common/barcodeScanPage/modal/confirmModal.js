import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { KITTEN_BUTTON_APPEARANCE_ENUM, KITTEN_BUTTON_SIZE_ENUM, KITTEN_BUTTON_STATUS_ENUM } from "../../enum/kittenButtonEnum";
import { COMMON_COLOR_ENUM } from "../../enum/commonColorEnum";
import KittenButton from "../../util/kittenButton";
import { COMMON_BORDER_RADIUS, COMMON_BOX_SHADOW, COMMON_FONT_SIZE } from "../../enum/commonStyleEnum";

const ConfirmModal = (props) => {

    const { visible, setVisible, hideModal, sendConfirmData, orderId, model } = props;

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ padding: 40 }}>
              <Text style={[styles.textStyle, { marginVertical: 30, textAlign: "center" }]}>
                  확정하시겠습니까?
              </Text>
              <View style={{ marginVertical: 10, borderBottomColor: COMMON_COLOR_ENUM.LIGHT_GRAY, borderBottomWidth: 1 }}></View>
              <View>
                <Text style={[styles.titleStyle, { marginVertical: 5 }]}>
                  고객 주문 아이디
                </Text>
                  <Text style={[styles.textStyle]}>
                  {`${orderId}`}
                </Text>
              </View>
              <View>
                <Text style={[styles.titleStyle, { marginVertical: 5 }]}>
                  모델명
                </Text>
                <Text style={[styles.textStyle]}>
                  {model}
                </Text>
              </View>
            </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: "10%", marginBottom: 40 }}> 
                <KittenButton
                  title="취소"
                  size={KITTEN_BUTTON_SIZE_ENUM.LARGE}
                  appearance={KITTEN_BUTTON_APPEARANCE_ENUM.OUTLINE}
                  onPress={() => {
                    hideModal && hideModal();
                    setVisible(false);
                  }}
                  style={{ width: "45%" }}
                />
                <KittenButton
                  title="확인"
                  size={KITTEN_BUTTON_SIZE_ENUM.LARGE}
                  onPress={sendConfirmData}
                  style={{ width: "45%" }}
                />
              </View>
          </View>
        </View>
        <View style={{ position: "absolute", zIndex: 90, opacity: 0.6, backgroundColor: "black", width: "100%", height: "100%" }}></View>
      </Modal>
    </>
  )
};

export default ConfirmModal;


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
    ...COMMON_BOX_SHADOW
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18
  },
  titleStyle: {
    color: COMMON_COLOR_ENUM.DARK_GRAY,
    fontWeight: "700",
    fontSize: COMMON_FONT_SIZE
  },
  modalText: {
    fontSize: 18,
    fontWeight: "600"
  }
});

