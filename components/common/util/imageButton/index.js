import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import CameraImg from "../../../../assets/button/camera.png"
import { COMMON_COLOR_ENUM } from "../../enum/commonColorEnum";
import { KITTEN_BUTTON_SIZE_ENUM, KITTEN_BUTTON_STATUS_ENUM } from "../../enum/kittenButtonEnum";
import CloseImg from "../../../../assets/modal/close_popup.png"
import KittenButton from "../kittenButton";
import { callCamera, callImagePicker } from "../../../../functions/imagePickerFunc";
import { imgUploadCall } from "../../../../functions/s3ImageUploadFunc";
import CameraBtnImg from "../../../../assets/button/camera-btn.png"
import { COMMON_BORDER_RADIUS, COMMON_BOX_SHADOW } from "../../enum/commonStyleEnum";

const ACTION_TYPE_ENUM = Object.freeze({
  CAMERA: "camera",
  PHONE_ALBUM: "album"
});
const TITLE_POSITION_ENUM = Object.freeze({
  TOP: "top",
  BOTTOM: "bottom"
});

const ImageButton = (props) => {

  const {
    state,
    setState,
    onPicture,
    displayMode = false,
    title,
    style,
    titlePosition = TITLE_POSITION_ENUM.TOP,
    imgStyle,
    btnDisable = false
  } = props


  const [modalVisible, setModalVisible] = useState(false);



  const handleImg = async (action) => {

    switch (action) {
      case ACTION_TYPE_ENUM.CAMERA:
        const cameraRs = await callCamera();

        if (cameraRs.uri) {
          const rsUrl = await imgUploadCall(cameraRs.uri);
          onPicture && onPicture(rsUrl);
          console.log("주소는??", rsUrl)
        }
        break;

      case ACTION_TYPE_ENUM.PHONE_ALBUM:
        const imgPickerRs = await callImagePicker();

        if (imgPickerRs.uri) {
          const rsUrl = await imgUploadCall(imgPickerRs.uri);
          onPicture && onPicture(rsUrl);
        }
        break;
      default:
        break;
    }
    setModalVisible(false);

  }


  const SelectionModal = () => {
    return (
      <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ borderBottomColor: COMMON_COLOR_ENUM.LIGHT_GRAY , borderBottomWidth: 2, marginBottom: 35, paddingBottom: 35}}>
              <Text style={styles.modalText}>사진입력 선택</Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: "absolute", right: 20, top: 20 }}>
              <Image source={CloseImg} style={{ width: 20, height: 20, resizeMode: "stretch" }} />
            </TouchableOpacity>
            <KittenButton
              title="카메라"
              status={KITTEN_BUTTON_STATUS_ENUM.GRAY}
              size={KITTEN_BUTTON_SIZE_ENUM.LARGE}
              onPress={() => handleImg(ACTION_TYPE_ENUM.CAMERA)}
            />
            <KittenButton
              title="갤러리"
              status={KITTEN_BUTTON_STATUS_ENUM.GRAY}
              size={KITTEN_BUTTON_SIZE_ENUM.LARGE}
              onPress={() => handleImg(ACTION_TYPE_ENUM.PHONE_ALBUM)}
              style={{ marginTop: 10 }}
            />
          </View>
        </View>
        <View style={{ position: "absolute", zIndex: 90, opacity: 0.6, backgroundColor: "black", width: "100%", height: "100%" }}></View>
      </Modal>
    )
  }


  const DisplayImage = (props) => {

    const {
      imgStyle = {}
    } = props;

    return (
      <View style={{ height: 100, width: 100, overflow: "hidden", borderRadius: 8 }, imgStyle}>
        {!displayMode &&
          <TouchableOpacity onPress={() => setState()} style={{ position: "absolute", right: 10, top: 10, zIndex: 90 }}>
          <Image source={CloseImg} style={{ width: 20, height: 20, resizeMode: "stretch" }} />
        </TouchableOpacity>}
        <Image  
            style={{ width: "100%", height: "100%", resizeMode: "stretch", zIndex:0 }}
            source={{
                uri: state,
                headers: {
                  Accept: '*/*'
                }
            }} 
        />  
    </View>
    )
  }

  return (
    <>
      <SelectionModal />
      <View style={[{ width: 100 }, style]}>
        {titlePosition === TITLE_POSITION_ENUM.TOP ?
        <Text style={styles.imgTitleStyle}>
          {title}
        </Text> 
        : <View/>}
      {state ?
      <DisplayImage {...props} />
      :
        <TouchableOpacity activeOpacity={!btnDisable ? .4 : 1}  style={[styles.imageBtnStyle, imgStyle]} onPress={() => {!btnDisable && setModalVisible(true)}}>
          <Image source={CameraBtnImg} style={{ width: 38, height: 35, resizeMode: "stretch" }} />
        </TouchableOpacity>
      }
      {titlePosition === TITLE_POSITION_ENUM.BOTTOM ?
        <Text style={styles.imgTitleStyle}>
          {title}
        </Text> 
        : <View/>}
      </View>
    </>
  )
};

export default ImageButton;


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
  },
  imageBtnStyle: {
    height: 100,
    width: 100,
    backgroundColor: COMMON_COLOR_ENUM.LIGHT_BLUE,
    borderRadius: COMMON_BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center"
  },
  imgTitleStyle: { color: COMMON_COLOR_ENUM.MIDDLE_BLUE, fontWeight: "600", textAlign: "center", marginVertical: 5}

});

