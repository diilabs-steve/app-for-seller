import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Platform } from "react-native";
import { COMMON_COLOR_ENUM } from '../common/enum/commonColorEnum';
import Constants from 'expo-constants';
import { COMMON_BORDER_RADIUS, COMMON_FONT_SIZE, COMMON_PAGE_PADDING, COMMON_SCAN_PAGE_BG } from '../common/enum/commonStyleEnum';
import CustomContainer from '../common/util/customContainer';
import DashBoard from '../common/util/dashboard';
import ScanImg from "../../assets/main/scan.png";
import Profile from "../../assets/main/profile.png";
import Collect from "../../assets/main/collect.png";
import IncomePo from "../../assets/main/income_po.png";
import InvenInvest from "../../assets/main/inven_invest.png";
import IncomeMove from "../../assets/main/inven_move.png";
import LoanDeliv from "../../assets/main/loan_deliv.png";
import Pallet from "../../assets/main/pallet.png";
import ProductImg from "../../assets/main/product.png";
import LocationImg from "../../assets/main/location.png";
import PickingTrunkImg from "../../assets/main/picking_trunk.png";
import OutgoingTrunkImg from "../../assets/main/outgoing_trunk.png";
import IncomingTrunkImg from "../../assets/main/incoming_trunk.png";
import PickingLoanImg from "../../assets/main/picking_loan.png";
import { MAIN_NAVIGATE_ENUM } from '../../navigationVar';
import Title from '../common/util/title';
import ScanInput from '../common/scanInput';
import { clearStorage } from '../../functions/storageFunc';
import { HOST } from '../../envVars';

const Presenter = (props) => {

    const {
        navigation,
        route,
        barcode,
        setBarcode,
        onBarcodeScanned,
        host
    } = props;
    const { params = {} } = route;
    const { ctx } = params;
    const version = `${Constants.manifest.version}`;

    /**
     * constant
     */
    const { signOut } = React.useContext(ctx);


    const renderItem = (props) => <DashBoard {...props} />

    return (
        <>
            <ScrollView>
            <CustomContainer style={styles.background} />
            <View style={{ padding: COMMON_PAGE_PADDING }}>
                <View style={{ flexDirection: "row-reverse", marginTop: 50 }}>
                    <UserInfoBtn
                        {...props}
                    />
                </View>

                <View style={{ paddingLeft: 23 }}>
                    <Image source={ScanImg} style={{ width: 58, height: 57.34, resizeMode: "stretch", marginVertical: 20 }} />
                    <Title>
                        바코드를 스캔하여
                    </Title>
                    <Title style={{ marginTop: 5 }}>
                        업무를 시작하세요
                    </Title>
                </View>
                <ScanInput 
                    {...props}
                    onPress={() => onBarcodeScanned(barcode)}
                    state={barcode}
                    setState={setBarcode}
                    style={{ marginTop: 30 }} 
                    placeholder="바코드 직접 입력"
                    size="big" />
                <NavigationButtons {...props} />
            </View>
            <View style={{ backgroundColor: "#3D3D5B", padding: COMMON_PAGE_PADDING }}>

                <Title style={{ color: "white", marginLeft: 10, marginTop: 28 }}>
                    총 재고현황과
                </Title>
                <Title style={{ color: "white", marginLeft: 10, marginTop: 5 }}>
                    나의 작업량이에요
                </Title>

                <View style={{ marginVertical: 30 }}>
                    <DashBoard 
                        {...props} 
                        containerStyle={{ backgroundColor: "#61CACA" }}
                        titleStyle={{ color: "white" }}
                        contentStyle={{ color: "white" }}
                        itemStyle={{ borderLeftColor: "white" }}
                        topTitle="인천 CDC"
                        topSubTitle="오늘 8월 17일"
                    />
                    <DashBoard 
                        {...props} 
                        containerStyle={{ backgroundColor: COMMON_COLOR_ENUM.MIDDLE_BLUE, marginTop: 15 }}
                        titleStyle={{ color: "white" }}
                        contentStyle={{ color: "white" }}
                        itemStyle={{ borderLeftColor: "white" }}
                        topTitle="이바른"
                        topSubTitle="오늘 8월 17일"
                    />
                </View>
                <Text style={{ color: "white" }}>
                    {`앱버전: ${version}`}
                </Text>
                <Text style={{ color: "white" }}>
                    {`${host}`}
                </Text>
            </View>
            </ScrollView>
        </>
    );
};

export default Presenter;

const NavigationButtons = (props) => {
    const {
        navigationInfo = {}
    } = props;
    return (
        <View style={{ marginTop: 40, alignItems: "center" }}>
            <View style={styles.iconRow}>
                {navigationInfo.row1.map(nav => 
                    <MenuBtn 
                        title={nav.title} 
                        image={nav.image} 
                        imgStyle={nav.imgStyle} 
                        onPress={nav.onPress} />
                )}
            </View>
            <View style={styles.rowDivider}><Text></Text></View>
            <View style={styles.iconRow}>
                {navigationInfo.row2.map(nav => 
                    <MenuBtn 
                        title={nav.title} 
                        image={nav.image} 
                        imgStyle={nav.imgStyle} 
                        onPress={nav.onPress} />
                )}
            </View>
            <View style={styles.rowDivider}><Text></Text></View>
            <View style={styles.iconRow}>
                {navigationInfo.row3.map(nav => 
                    <MenuBtn 
                        title={nav.title} 
                        image={nav.image} 
                        imgStyle={nav.imgStyle} 
                        onPress={nav.onPress} />
                )}
            </View>
        </View>
    )
}   


const UserInfoBtn = (props) => {

    const {
        navigation
    } = props;

    return (
        <TouchableOpacity style={{  flexDirection: "row", alignItems: "center" }} onPress={() => {
            // clearStorage();
            // signOut()
            navigation.navigate(MAIN_NAVIGATE_ENUM.USER_PROFILE);
        }}>
            <Image source={Profile} style={styles.profileImg} />
            <Text style={{ fontSize: COMMON_FONT_SIZE, color: COMMON_COLOR_ENUM.DEEP_DARK_GRAY, marginLeft: 5 }}>
                내정보
            </Text>
        </TouchableOpacity>
    )
}

const MenuBtn = (props) => {

    const {
        image = null,
        title = "",
        onPress = () => {},
        imgStyle = {}
    } = props;
        
    return (
        <View style={{ alignItems: "center", width: 58, height: 90 }}>
            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <View style={{ height: 40 }}>
                  <Image source={image} style={[styles.btnImg, imgStyle]} />
                </View>
                <Text style={{ fontSize: Platform.OS === "android" ? 14 : 16, marginTop: 10 }}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        // backgroundColor: "gray",
        backgroundColor: "#F4F6F9",
        width: "120%",
        // left: "-15%",
        height: 320,
        borderBottomLeftRadius: 40
    },
    btnImg: {
        width: 29,
        height: 29,
        resizeMode: "stretch"
    },
    profileImg: {
        width: 20,
        height: 20,
        resizeMode: "stretch"
    },
    btn: {
        width: 60,
        // backgroundColor: "#EBEFF9",
        borderRadius: COMMON_BORDER_RADIUS,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    },
    iconRow: { width: "96%", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: "4%", paddingVertical: "1%" },
    rowDivider: { borderTopWidth: 1, borderTopColor: "#E9EDF2", width: "90%", alignSelf: "center" }
})