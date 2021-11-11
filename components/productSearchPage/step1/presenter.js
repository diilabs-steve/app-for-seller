import React from 'react';
import { StyleSheet, Image, Text, View } from "react-native";
import { COMMON_FONT_SIZE, COMMON_PAGE_PADDING, COMMON_SCAN_PAGE_BG, COMMON_SCAN_PAGE_CONTAINER } from '../../common/enum/commonStyleEnum';
import ScanInput from '../../common/scanInput';
import CustomContainer from '../../common/util/customContainer';
import Title from '../../common/util/title';
import ProductinfoImg from "../../../assets/productinfo/productinfo.png";
import { COMMON_COLOR_ENUM } from '../../common/enum/commonColorEnum';
import AlertModal from '../../common/util/alertModal';
import Dropdown from '../../common/util/dropdown';

const Presenter = (props) => {
    const {
        navigation,
        handleNextStep,
        barcode,
        setBarcode,
        handleBarcodeScanned,
        alertVisible,
        setAlertVisible,
        alertMessage,
    } = props;

    return (
        <>
        <AlertModal visible={alertVisible} setVisible={setAlertVisible} message={alertMessage} />
        <CustomContainer style={styles.container}>
            <SearchSection {...props} />
            {/* <CustomContainer style={COMMON_SCAN_PAGE_BG} >
                <Image source={ProductinfoImg} style={{ width: 52.11, height: 60, resizeMode: "stretch", bottom: 13 }} />
                <Title style={{ marginVertical: 10 }}>제품정보</Title>
                <Text style={{ fontSize: COMMON_FONT_SIZE, color: COMMON_COLOR_ENUM.MIDDLE_GRAY }}>
                    {`모델 바코드를 스캔하거나`}
                </Text>
                <Text style={{ fontSize: COMMON_FONT_SIZE, color: COMMON_COLOR_ENUM.MIDDLE_GRAY, marginTop: 5 }}>
                    {`직접 입력해주세요.`}
                </Text>
            </CustomContainer> */}

        </CustomContainer>
        </>
    );
};

export default Presenter;

const SearchSection = (props) => {

    const {
        options,
        searchOption,
        setSearchOption
    } = props;

    return (
        <View style={{ flexDirection: "row" }}>
            <Dropdown 
                data={options} 
                buttonStyle={{ width: "30%" }}
                value={searchOption.value}
                onSelect={(selectedItem) => {
                    setSearchOption(selectedItem);
                }}
            />
            <View style={{ width: "70%" }}>
                <ScanInput 
                    placeholder="모델 바코드 직접 입력"
                    btnStyle={{ elevation: 0, width: 48, height: 48, marginLeft: 5 }}
                    inputStyle={{ elevation: 0, borderWidth: 1, borderColor: COMMON_COLOR_ENUM.GRAY, height: 48, marginLeft: 5 }}
                    scopeIconNone={true}
                    inputWidth={searchOption.value === "barcode" ? "82%" : "100%"}
                    btnVisible={searchOption.value === "barcode"}
                    // onPress={() => handleBarcodeScanned(barcode)}
                    // onBarcodeScanned={handleBarcodeScanned} 
                    // state={barcode}
                    // setState={setBarcode}
                    // size="big"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: COMMON_PAGE_PADDING,
        height: "100%"
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