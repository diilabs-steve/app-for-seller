import React from 'react';
import { StyleSheet, Image, Text, View } from "react-native";
import { COMMON_BORDER_RADIUS, COMMON_BOX_SHADOW, COMMON_FONT_SIZE, COMMON_LARGE_FONT_SIZE, COMMON_PAGE_PADDING, COMMON_SCAN_PAGE_BG, COMMON_SCAN_PAGE_CONTAINER, COMMON_SMALL_FONT_SIZE } from '../../common/enum/commonStyleEnum';
import ScanInput from '../../common/scanInput';
import CustomContainer from '../../common/util/customContainer';
import Title from '../../common/util/title';
import ProductinfoImg from "../../../assets/productinfo/productinfo.png";
import { COMMON_COLOR_ENUM } from '../../common/enum/commonColorEnum';
import AlertModal from '../../common/util/alertModal';
import Dropdown from '../../common/util/dropdown';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Label from '../../common/util/label';

const REQUEST_COLOR = "#FF806F";
const APPROVE_COLOR = "#A0DD1D";


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
            <ModelList {...props} />
        </CustomContainer>
        </>
    );
};

export default Presenter;

const SearchSection = (props) => {

    const {
        options,
        searchOption,
        setSearchOption,
        searchText,
        setSearchText,
        handleBarcodeScanned
    } = props;

    return (
        <View style={{ flexDirection: "row", padding: 10 }}>
            <Dropdown 
                data={options} 
                buttonStyle={{ width: "29%" }}
                value={searchOption.value}
                onSelect={(selectedItem) => {
                    setSearchOption(selectedItem);
                }}
            />
            <View style={{ width: "70%" }}>
                <ScanInput 
                    {...props}
                    placeholder="모델 바코드 직접 입력"
                    btnStyle={{ elevation: 0, width: 50, height: 50, marginLeft: 5 }}
                    inputStyle={{ elevation: 0, borderWidth: 1, borderColor: COMMON_COLOR_ENUM.GRAY, height: 50, marginLeft: 5 }}
                    scopeIconNone={true}
                    inputWidth={searchOption.value === "barcode" ? "82%" : "100%"}
                    btnVisible={searchOption.value === "barcode"}
                    onPress={() => handleBarcodeScanned(searchText)}
                    onBarcodeScanned={handleBarcodeScanned} 
                    state={searchText}
                    setState={setSearchText}
                    // size="big"
                />
            </View>
        </View>
    )
}

const ModelList = (props) => {

    const {
        modelList = [],
        onCardPress
    } = props;
    console.log(modelList)
    return (
        <>
        <View style={{ padding: 10, paddingTop: 20 }}>
            <Text style={{ fontSize: COMMON_SMALL_FONT_SIZE }}>
                {`총 ${modelList.length}건`}
            </Text>
        </View>
        <ScrollView>
            <View style={{ paddingBottom: 100}}>
                {modelList.map(m => 
                    <ModelCard info={m} onCardPress={onCardPress} />
                )}
            </View>
        </ScrollView>
        </>
    )
}

const ModelCard = (props) => {

    const {
        info,
        onCardPress
    } = props;

    return (
        <TouchableOpacity style={styles.cardStyle} onPress={() => onCardPress(info)}>  
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Label title={info.confirmFlag ? "승인" : "요청"} style={{ widtsh: 70 }} backgroundColor={info.confirmFlag ? APPROVE_COLOR : REQUEST_COLOR} />
                <Text style={{ fontSize: COMMON_SMALL_FONT_SIZE, marginLeft: 15, color: COMMON_COLOR_ENUM.DEEP_DARK_GRAY, fontWeight: "bold" }}>
                    {`${info.productSeq}  인프라 ${info.infraSeq}`}
                </Text>
            </View>
                {/* <Text style={{ fontSize: 19, fontWeight: "700", marginLeft: 17, marginVertical: 10 }}>
                    {`${info.model}`}
                </Text> */}
                <Text style={{ fontSize: 17, fontWeight: "100", marginLeft: 17, marginVertical: 10 }}>
                    {`${info.productName}`}
                </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding: COMMON_PAGE_PADDING,
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
    cardStyle: {
        backgroundColor: "white",
        width: "95%",
        borderRadius: COMMON_BORDER_RADIUS,
        padding: 15,
        marginTop: 15,
        marginHorizontal: 10,
        zIndex: 30,
        ...COMMON_BOX_SHADOW,
    },
});