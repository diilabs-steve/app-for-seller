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
            <PoList {...props} />
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

const PoList = (props) => {

    const {
        poList = [],
        onCardPress
    } = props;
    console.log(poList)
    return (
        <>
        <View style={{ padding: 10, paddingTop: 20 }}>
            <Text style={{ fontSize: COMMON_SMALL_FONT_SIZE }}>
                {`총 ${poList.length}건`}
            </Text>
        </View>
        <ScrollView>
            <View style={{ paddingBottom: 100}}>
                {poList.map(m => 
                    <PoCard info={m} onCardPress={onCardPress} />
                )}
            </View>
        </ScrollView>
        </>
    )
}

const PoCard = (props) => {

    const {
        info,
        onCardPress
    } = props;

    return (
        <View style={styles.cardStyle}>  
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 }}>
                <Title>
                    3100000137
                </Title>
                <View>
                    <Text style={{ fontSize: COMMON_FONT_SIZE }}>
                        {`오늘의집 • 남사FC`}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, paddingBottom: 20, borderBottomColor: COMMON_COLOR_ENUM.LIGHT_GRAY, borderBottomWidth: 1 }}>
                <View style={{ flexDirection: "row", width: "46%", borderRightWidth: 1, borderRightColor: COMMON_COLOR_ENUM.GRAY}}>
                    <Text style={styles.poTitle}>
                        {`발주일`}
                    </Text>
                    <Text style={{ textAlign: "center", fontSize: COMMON_SMALL_FONT_SIZE }}>
                        {`2021-09-22`}
                    </Text>
                </View>
                <View style={{ flexDirection: "row-reverse", width: "54%"}}>
                    <Text style={{ textAlign: "center", fontSize: COMMON_SMALL_FONT_SIZE }}>
                        {`2021-09-22`}
                    </Text>
                    <Text style={styles.poTitle}>
                        {`입고예정일`}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 }}>
                <Title>
                    ZPC2032
                </Title>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 55 }}>
                        <Text style={{ fontSize: COMMON_FONT_SIZE, textAlign: "center" }}>
                            발주
                        </Text>
                        <Text style={{ fontSize: COMMON_FONT_SIZE, textAlign: "center", fontWeight: "bold" }}>
                            50
                        </Text>
                    </View>
                    <View style={{ borderWidth: .5, height: 25, borderColor: COMMON_COLOR_ENUM.GRAY }} />
                    <View style={{ width: 55 }}>
                        <Text style={{ fontSize: COMMON_FONT_SIZE, textAlign: "center", color: COMMON_COLOR_ENUM.MIDDLE_BLUE }}>
                            입고
                        </Text>
                        <Text style={{ fontSize: COMMON_FONT_SIZE, textAlign: "center", color: COMMON_COLOR_ENUM.MIDDLE_BLUE, fontWeight: "bold" }}>
                            349
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    poTitle: { textAlign: "center", fontSize: COMMON_SMALL_FONT_SIZE, color: COMMON_COLOR_ENUM.DEEP_DARK_GRAY, marginRight: 10 },
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
        // padding: 15,
        marginTop: 15,
        marginHorizontal: 10,
        zIndex: 30,
        borderWidth: 1,
        borderColor: COMMON_COLOR_ENUM.GRAY
        // ...COMMON_BOX_SHADOW,
    },
});