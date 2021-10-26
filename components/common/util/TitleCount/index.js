import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { COMMON_COLOR_ENUM } from '../../enum/commonColorEnum';
import { COMMON_SMALL_FONT_SIZE } from '../../enum/commonStyleEnum';
import PropTypes from 'prop-types';

const TitleCount = (props) => {

    const {
        title = "",
        list = [],
        totalList = [],
        rightContent
    } = props;

    return (
        <View style={styles.container}>
            <View style={styles.countContainer}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.count}>
                    {`${list.length}`}
                </Text>
                <Text style={styles.totalCount}>
                    {`/${totalList.length}`}
                </Text>
            </View>
            <View style={{ marginRight: 5 }}>
                {rightContent && rightContent}
            </View>
        </View>
    )
}

export default TitleCount;

TitleCount.propTypes = {
    title: PropTypes.string,
    list: PropTypes.array,
    totalList: PropTypes.array,
    rightContent: PropTypes.object
}

const styles = StyleSheet.create({
    title: {
        fontSize: COMMON_SMALL_FONT_SIZE,
        color: COMMON_COLOR_ENUM.MIDDLE_GRAY,
        marginLeft: 8
    },
    totalCount: {
        fontSize: COMMON_SMALL_FONT_SIZE
    },
    count: {
        fontSize: COMMON_SMALL_FONT_SIZE,
        color: "#5759E3",
        marginLeft: 8
    },
    countContainer: { 
        flexDirection: "row", 
        alignItems: "center"
    },
    container: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        width: "100%",
        marginTop: 15
    }
});