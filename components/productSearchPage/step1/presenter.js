import React from 'react';
import { StyleSheet, Image, Text, Alert } from "react-native";
import { COMMON_FONT_SIZE, COMMON_PAGE_PADDING, COMMON_SCAN_PAGE_BG, COMMON_SCAN_PAGE_CONTAINER } from '../../common/enum/commonStyleEnum';
import ScanInput from '../../common/scanInput';
import CustomContainer from '../../common/util/customContainer';
import Title from '../../common/util/title';
import ProductinfoImg from "../../../assets/productinfo/productinfo.png";
import { COMMON_COLOR_ENUM } from '../../common/enum/commonColorEnum';
import AlertModal from '../../common/util/alertModal';

const Presenter = (props) => {
    const {
        navigation,
        handleNextStep,
        barcode,
        setBarcode,
        handleBarcodeScanned,
        alertVisible,
        setAlertVisible,
        alertMessage
    } = props;
    return (
        <>
        <AlertModal visible={alertVisible} setVisible={setAlertVisible} message={alertMessage} />
        <CustomContainer style={COMMON_SCAN_PAGE_CONTAINER}>
            <CustomContainer style={COMMON_SCAN_PAGE_BG} >
                <Image source={ProductinfoImg} style={{ width: 52.11, height: 60, resizeMode: "stretch", bottom: 13 }} />
                <Title style={{ marginVertical: 10 }}>제품정보</Title>
                <Text style={{ fontSize: COMMON_FONT_SIZE, color: COMMON_COLOR_ENUM.MIDDLE_GRAY }}>
                    {`모델 바코드를 스캔하거나`}
                </Text>
                <Text style={{ fontSize: COMMON_FONT_SIZE, color: COMMON_COLOR_ENUM.MIDDLE_GRAY, marginTop: 5 }}>
                    {`직접 입력해주세요.`}
                </Text>
            </CustomContainer>
            <ScanInput 
                {...props} 
                placeholder="모델 바코드 직접 입력"
                onPress={() => handleBarcodeScanned(barcode)}
                onBarcodeScanned={handleBarcodeScanned} 
                state={barcode}
                setState={setBarcode}
                size="big"
            />
        </CustomContainer>
        </>
    );
};

export default Presenter;

const styles = StyleSheet.create({
    container: {
        padding: COMMON_PAGE_PADDING,
        height: "100%",
        paddingTop: 300
    },
    background: {
        position: "absolute",
        // backgroundColor: "gray",
        backgroundColor: "#F4F6F9",
        width: "120%",
        // left: "-15%",
        height: 350,
        borderBottomLeftRadius: 40,
        paddingTop: "20%",
        paddingLeft: 40
    },
});