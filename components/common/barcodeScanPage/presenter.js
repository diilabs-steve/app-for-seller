import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Image, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import axios from "axios";
import { API_LOAN } from "../../../envVars";
import ConfirmModal from "./modal/confirmModal";
import AlertModal from "../util/alertModal";
import { KITTEN_BUTTON_SIZE_ENUM } from "../enum/kittenButtonEnum";
import { getStorage } from "../../../functions/storageFunc";
import KittenButton from "../util/kittenButton";
import { COMMON_BORDER_RADIUS, COMMON_FONT_SIZE } from "../enum/commonStyleEnum";
import Title from "../util/title";
import CustomButton from "../util/customButton";
import ScanImg from "../../../assets/button/scan.png";
import { COMMON_COLOR_ENUM } from "../enum/commonColorEnum";

const Presenter = (props) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeFormat, setBarcodeFormat] = useState(null);
  const [barcodeData, setBarcodeData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [assign_info, setassign_info] = useState({});
  const [assign_id, setassign_id] = useState();
  const [loan_id, setloan_id] = useState();
  const [scanMode, setScanMode] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);


  /**
   * props
   */
  const { route, navigation } = props;
  const { params = {} } = route;
  const { usage, list } = params;

  // console.log("리스트는???????????÷÷????", params.list)
  // console.log("리스트는???????????????", params)

  const windowHeight = Dimensions.get('window').height;

  /**
   * methods
   */
  const showModal = () => setVisible(true);
  const hideModal = () => {
    navigation.navigate(params.pageName);
    setVisible(false);
  };
  const get_assign_info = async (barcodeData) => {
    console.log("get assign info============>>>>>>", barcodeData, params.list.filter(
      (a) =>
        a.barcode.trim() === barcodeData
    ))
    if (params.list) {
      let filtered = params.list.filter(
        (a) =>
          a.barcode.trim() === barcodeData &&
          a.confirmedDriver === false &&
          a.confirmed === true
      );

      console.log("filter???", filtered);

      if (filtered[0] && filtered[0].assignOrderId) {
        setassign_id(filtered[0].assignOrderId);
        setloan_id(filtered[0].loanId);
        setassign_info({
          order_id: filtered[0].orderId,
          model: filtered[0].model,
          order_quantity: filtered[0].total,
          is_confirm_loan: filtered[0].confirmed,
          is_driver_confirm_loan: filtered[0].confirmedDriver,
          assignWithInventoryId: filtered[0].assignWithInventoryId
        });

        return filtered[0];
      } else {
        let filtered = params.list.filter(
          (a) => a.barcode.trim() === barcodeData
        );
        if (filtered[0]) return filtered[0];
        else return null;
      }
    } else {
      navigation.navigate(params.pageName);
    }
  };
  const sendConfirmData = async () => {
    const rs = assign_id && confirmLoanModel(loan_id, assign_id);

    (await rs) == "200" &&
      navigation.navigate(params.pageName, {
        barcodeFormat,
        barcodeData,
        usage: params.usage,
        listForceUpdate: true,
      });
    setBarcodeFormat(null);
    setBarcodeData(null);
  };

  const sendData = async () => {
    console.log(params, barcodeFormat, barcodeData, params.usage)
    navigation.navigate(params.pageName, {
      barcodeFormat,
      barcodeData,
      hashkey: `#${Math.random()}`,
      usage: params.usage,
      // listForceUpdate: true,
    });
    setBarcodeFormat(null);
    setBarcodeData(null);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    if (barcodeData && usage !== "confirm") {
      sendData();
    }
  }, [barcodeData, x, y, scanMode]);

  const confirmLoanModel = async (loan_id, assign_id) => {
    const HOST = await getStorage("host");

    const data = await axios
      .post(
        `${HOST + API_LOAN}/${loan_id}/assign/${assign_id}`,
        {
          assignWithInventoryId: assign_info.assignWithInventoryId
        },
        {
          headers: {
            Authorization: `Bearer ${params.accessToken}`,
          },
        }
      )
      .then((rs) => {
        if (rs.data.status === "fail") {
          Alert.alert(`실패했습니다. ${rs.data.message ? rs.data.message : ""}`);
        }

        return rs.status;
      })
      .catch((err) => {
        if (err) {
          console.log(err)
          Alert.alert("실패");
        }
        if (err.response) {
        }
      });
    return data;
  };

  const handleBarCodeScanned = async ({ type, data, bounds }) => {
    const topH = windowHeight * 0.3;
    const topL = windowHeight * 0.48;
    setX(topH);
    setY(topL);
    const scannYpos = bounds?.origin?.y;
    console.log("H=> ", topH, "L=>", topL, "scanY=>", scannYpos);
    // Alert.alert(`영역내 스캔 ${data.data}`)
    if (scannYpos >= topH && scannYpos <= topL && scanMode) {
      // Alert.alert("fey")
      setScanMode(false)
      setScanned(true);
      setBarcodeFormat(type);
      setBarcodeData(data);
      const key = `#${Math.random()}`;
      console.log("시점???", params.pageName, params.usage, data, key)
      navigation.navigate(params.pageName, {
        barcodeData: data,
        usage: params.usage,
        key
      });
      // if (params.usage === "confirm") {
      //   const assign_data = await get_assign_info(data);

      //   console.log("assign??????", assign_data);
      //   if (assign_data && assign_data.orderId) {
      //     if (assign_data.confirmed) {
      //       if (!assign_data.confirmedDriver && usage === "confirm") {
      //         showModal();
      //       } else {
      //         setAlertMessage("이미 차용된 제품입니다.")
      //         setAlertVisible(true);

      //       }
      //     } else {
      //       setAlertMessage("창고 차용이 선행되어야합니다.")
      //       setAlertVisible(true);
      //     }
      //   } else {
      //     setAlertMessage(`일치하는 모델이 없습니다. ${data}`)
      //     setAlertVisible(true);
      //   }
      // } else {
      //   // usage !== "confirm" && Alert.alert(`스캔완료`);
      // }
    }

  };

  if (hasPermission === null) {
    return <Text></Text>;
  }
  if (hasPermission === false) {
    return <Text></Text>;
  }

  return (
    <>
      <AlertModal visible={alertVisible} setVisible={setAlertVisible} message={alertMessage} yBtnCallBack={() => navigation.navigate(params.pageName)} />


      {/* <TouchableOpacity 
      onPress={() => {
        setScanMode(true)
      }}
      style={{position: "absolute", zIndex: 19, bottom: 10, justifyContent: "center", alignItems: "center", width: "90%", left: "5%", height: "12%", backgroundColor: "white", borderWidth:3}}>
        <View style={{ alignItems: "center" }}>
          <Text style={{fontSize: 20, textAlign: "center", textAlignVertical: "center", fontWeight: "700"}}>
            스캔하기
          </Text>
        </View>
      </TouchableOpacity> */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <BarcodeMask width={"80%"} height={"20%"} edgeBorderWidth={1} />
      {usage === "confirm" && (
        <View>
          {/* 
                  content: `${assign_info.order_id}`,
    },
    {
      title: "모델명",
      content: `${assign_info.model}`, */}
          <ConfirmModal
            visible={visible}
            setVisible={setVisible}
            hideModal={hideModal}
            sendConfirmData={sendConfirmData}
            orderId={assign_info.order_id}
            model={assign_info.model}
          />
        </View>
        // <Provider>
        //   <Portal>
        //     <View style={styles.container}></View>
        //     <Modal
        //       visible={visible}
        //       contentContainerStyle={styles.containerStyle}
        //     >
        //       <Text style={{ fontSize: 20, fontWeight: "700" }}>
        //         확정하시겠습니까?
        //       </Text>
        //       {element.map((el, index) => (
        //         <TwoBlockRowGrid
        //           title={el.title}
        //           content={el.content}
        //           key={`scandata-${index}`}
        //         />
        //       ))}
        //       <View style={{ flexDirection: "row-reverse" }}>
        //         <CustomButton
        //           name="확인"
        //           customStyle={{
        //             containerStyle: {
        //               marginLeft: 10,
        //             },
        //           }}
        //           onPress={sendConfirmData}
        //         />
        //         <CustomButton name="취소" onPress={hideModal} />
        //       </View>
        //     </Modal>
        //   </Portal>
        // </Provider>
      )}
      <View style={{ position: "absolute", bottom: 180, height: 56, width: "70%", alignSelf: "center", justifyContent: "center", backgroundColor: "white", borderRadius: COMMON_BORDER_RADIUS, alignItems: "center" }}>
        <Text style={{ color: COMMON_COLOR_ENUM.DEEP_DARK_GRAY }}>
          제품박스의 모델 바코드를 아래 사각형 안에
        </Text>
        <Text style={{ color: COMMON_COLOR_ENUM.DEEP_DARK_GRAY }}>
          위치시키고 버튼을 눌러주세요
        </Text>
      </View>
      <View style={{ position: "absolute", bottom: 0, width: "100%", height: 150, backgroundColor: "white", borderTopRightRadius: 20, borderTopLeftRadius: 20, alignItems: "center" }}>
        <Title style={{ fontSize: 17, marginTop: 20 }}>
          바코드 스캔
        </Title>
        <CustomButton
          title={<Image source={ScanImg} style={{ width: 30, height: 30, resizeMode: "stretch" }} />}          
          onPress={() => setScanMode(true)}
          btnStyle={{ justifyContent: "center", alignItems: "center", width: 70, height: 70, marginTop: 10 }}
        />
      </View>
    </>
  );
};

export default Presenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  containerStyle: { backgroundColor: "white", padding: 20 },
});

