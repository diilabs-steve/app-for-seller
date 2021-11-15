import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { STEP_NAVIGATE_ENUM } from "../../../navigationVar";
import { COMMON_COLOR_ENUM } from "../../common/enum/commonColorEnum";
import { COMMON_PAGE_PADDING } from "../../common/enum/commonStyleEnum";
import CustomButton from "../../common/util/customButton";
import CustomContainer from "../../common/util/customContainer";
import LeftTitleContent from "../../common/util/leftTitleContent";

const Presenter = (props) => {

  const {
    searchInfo = [],
    date,
    setDate,
    selectDate,
    navigation,
    exportModalVisible,
    setExportModalVisible } = props;

  return (
    <>
      <CustomContainer style={{ height: "100%", paddingHorizental: COMMON_PAGE_PADDING }}>
        {searchInfo.map((info = {}, idx) => 
            <LeftTitleContent title={info.title} titleStyle={info.titleStyle} content={info.content} justContent={info.justContent} key={`m-info-${idx}`} />
        )}
        <View style={{ padding: COMMON_PAGE_PADDING }}>
          <CustomButton
            title="검색하기"
            onPress={() => navigation.navigate(STEP_NAVIGATE_ENUM.STEP3)}
          />
          <View>
            <Text style={styles.notice}>
              모델을 입력해서 상세 대행료를 확인해주세요!
            </Text>
          </View>
        </View>
      </CustomContainer>
    </>
  )
}

export default Presenter;

const styles = StyleSheet.create({
  notice: { textAlign: "center", backgroundColor: COMMON_COLOR_ENUM.LIGHT_GRAY, padding: 20, borderRadius: 10, marginTop: 40 }
})