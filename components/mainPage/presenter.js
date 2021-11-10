import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Platform } from "react-native";
import { COMMON_COLOR_ENUM } from '../common/enum/commonColorEnum';
import Constants from 'expo-constants';
import { COMMON_BORDER_RADIUS, COMMON_FONT_SIZE, COMMON_PAGE_PADDING, COMMON_SCAN_PAGE_BG } from '../common/enum/commonStyleEnum';
import CustomContainer from '../common/util/customContainer';
import DashBoard from '../common/util/dashboard';
import ScanImg from "../../assets/main/scan.png";
import Profile from "../../assets/main/profile.png";
import Hamberger from "../../assets/main/hamberger.png";
import { COMMON_NAVIGATE_ENUM, MAIN_NAVIGATE_ENUM } from '../../navigationVar';
import Title from '../common/util/title';
import ScanInput from '../common/scanInput';

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
            <View style={{ position: "absolute", width: "100%", height: 340, backgroundColor: "#3D3D5B" }} />
            <View style={{ padding: COMMON_PAGE_PADDING }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 50 }}>
                    <HambergerBtn
                        {...props}
                    />
                    <UserInfoBtn
                        {...props}
                    />
                </View>

                <View style={{ paddingLeft: 23 }}>
                    <Image source={ScanImg} style={{ width: 58, height: 57.34, resizeMode: "stretch", marginVertical: 20 }} />
                    <Title style={{ color: "white" }}>
                        바코드를 스캔하여
                    </Title>
                    <Title style={{ marginTop: 5, color: "white" }}>
                        업무를 시작하세요
                    </Title>
                </View>
                <ScanInput 
                    {...props}
                    onPress={() => onBarcodeScanned(barcode)}
                    state={barcode}
                    setState={setBarcode}
                    style={{ marginTop: 30 }} 
                    placeholder="제품명/상품명 직접 입력"
                    size="big" />
                <NavigationButtons {...props} />
            </View>
            <View style={{ backgroundColor: "#3D3D5B", padding: COMMON_PAGE_PADDING }}>
                <Title style={{ color: "white", marginLeft: 10, marginTop: 28 }}>
                    대행료
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


const HambergerBtn = (props) => {

    const {
        navigation
    } = props;

    return (
        <TouchableOpacity style={{  flexDirection: "row", alignItems: "center" }} onPress={() => {
            // clearStorage();
            // signOut()
            navigation.navigate(COMMON_NAVIGATE_ENUM.HAMBERGER_MENU);
        }}>
            <Image source={Hamberger} style={styles.profileImg} />
        </TouchableOpacity>
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
            <Text style={{ fontSize: COMMON_FONT_SIZE, color: "white", marginLeft: 5 }}>
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