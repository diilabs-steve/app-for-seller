import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Platform } from "react-native";
import Constants from 'expo-constants';
import { COMMON_BORDER_RADIUS, COMMON_FONT_SIZE, COMMON_PAGE_PADDING, COMMON_SCAN_PAGE_BG, COMMON_SMALL_FONT_SIZE } from '../common/enum/commonStyleEnum';
import CustomContainer from '../common/util/customContainer';
import ScanImg from "../../assets/main/scan.png";
import Arrow from "../../assets/hambergerMenu/arrow.png";

import Title from '../common/util/title';

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

    return (
        <>
            <ScrollView>
            <CustomContainer style={styles.background} />
            <View style={{ padding: COMMON_PAGE_PADDING, backgroundColor: "white" }}>
                <View style={{ paddingLeft: 23 }}>
                    <Title>
                        (주) 하나로
                    </Title>
                    <Title style={{ marginTop: 5, fontSize: COMMON_SMALL_FONT_SIZE }}>
                        김기수님, 안녕하세요
                    </Title>
                </View>
                <NavigationButtons {...props} />
            </View>
            <View style={{ padding: COMMON_PAGE_PADDING, backgroundColor: "white", marginTop: 10 }}>
                <BottomMenu {...props} />
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
        </View>
    )
}   

const BottomMenu = (props) => {

    const {
        bottomMenuInfo = []
    } = props;

    return (
        <View>
            {bottomMenuInfo.map((i, idx) =>
                <BottomMenuItem info={i} style={{ borderBottomWidth: idx === bottomMenuInfo.length -1 ? 0 : 1 }} />    
            )}
        </View>
    )
}

const BottomMenuItem = (props) => {

    const {
        style,
        info
    } = props;

    return (
        <TouchableOpacity style={[styles.bottomMenuItem, style]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={info.image} style={[{ resizeMode: "stretch", marginRight: 10 }, info.imgStyle]} />
                <Text>
                    {info.title}
                </Text>
            </View>
            <View>
                <Image source={Arrow} style={{ resizeMode: "stretch", width: 10, height: 17 }} />
            </View>
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
        height: 400,
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
    rowDivider: { borderTopWidth: 1, borderTopColor: "#E9EDF2", width: "90%", alignSelf: "center" },
    bottomMenuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: "#E9EDF2",
        paddingHorizontal: 20,
        height: 60
    }
})