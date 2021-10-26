import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COMMON_COLOR_ENUM } from '../../enum/commonColorEnum';
import { COMMON_FONT_SIZE, COMMON_SMALL_FONT_SIZE } from '../../enum/commonStyleEnum';
import CommonCard from '../commonCard';
import Label from '../label';
import TitleQuantity from '../titleQuantity';

const SubContentCard = (props) => {
    const {
        subList = {
           list: [],
           titleKey: "",
           contentKey: "",
        },
        style = {}
    } = props;

    return (
        <CommonCard 
            {...props} 
            childrenCtStyle={{ position: "absolute", width: "100%" }}
            style={[{ alignItems: "center", height: (subList && subList?.list?.length > 0) ? 120 : "auto" }, style]}>
            <SubCount {...props} />
            {subList && <SubList {...props} /> }
        </CommonCard>
    );
};

const SubCount = (props) => {

    const {
        subContentTitle1 = "",
        subContentTitle2 = "",
        subContentText1 = "-",
        subContentText2 = "-",
        subList = {
           list: [],
           titleKey: "",
           contentKey: ""
        }
    } = props;
    
    return (
            <View style={[styles.container, { top: subList?.list?.length > 0 ? 28 : 18 }]}>
                {subContentTitle1 ?
                <View style={{ justifyContent: "center", minWidth: 50 }}>
                    <Text style={styles.title}>
                        {subContentTitle1}
                    </Text>
                    <Text style={styles.count}>
                        {subContentText1}
                    </Text>
                </View> : <View/>}
                {(subContentTitle1 && subContentTitle2) ? <View style={styles.divider} /> : <View/>}
                {subContentTitle2 ?
                <View style={{ justifyContent: "center", minWidth: 50 }}>
                    <Text style={[styles.title, { color: "#8788E1" }]}>
                        {subContentTitle2}
                    </Text>
                    <Text style={[styles.count, { color: COMMON_COLOR_ENUM.MIDDLE_BLUE }]}>
                        {subContentText2}
                    </Text>
                </View> : <View/>}
            </View>
    )
}

const SubList = (props) => {
    const {
        subList = {
           list: [],
           titleKey: "",
           contentKey: "",
        },
        subText = ""
    } = props;
    return (
        <View style={{ flexDirection: "row", marginTop: 25 }}>
            {subList?.list?.map((sb, idx) =>
                <Label key={`lab-key-${idx}`} style={{ marginLeft: 5 }} subText={subText} title={sb[subList.titleKey]} content={sb[subList.contentKey]} />
            )}
        </View>
    )
}

export default SubContentCard;

const styles = StyleSheet.create({
    container: { alignItems: "center", flexDirection: "row-reverse" },
    title: {
        fontSize: COMMON_SMALL_FONT_SIZE,
        textAlign: "center",
        color: COMMON_COLOR_ENUM.MIDDLE_GRAY,
    },
    count: {
        minWidth: 40,
        fontSize: 19,
        textAlign: "center"
    },
    divider: { borderLeftWidth: 1, borderLeftColor: COMMON_COLOR_ENUM.MIDDLE_GRAY, height: 30, marginHorizontal: 10 }
});