import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { STEP_NAVIGATE_ENUM } from "../../../navigationVar";
import { COMMON_COLOR_ENUM } from "../../common/enum/commonColorEnum";
import { COMMON_PAGE_PADDING, COMMON_SMALL_FONT_SIZE } from "../../common/enum/commonStyleEnum";
import CustomButton from "../../common/util/customButton";
import CustomContainer from "../../common/util/customContainer";
import Label from "../../common/util/label";
import LeftTitleContent from "../../common/util/leftTitleContent";
import Title from "../../common/util/title";

const Presenter = (props) => {

  const { navigation } = props;

  return (
    <>
      <CustomContainer style={{ height: "100%", paddingHorizental: COMMON_PAGE_PADDING }}>
        {/* {searchInfo.map((info = {}, idx) => 
            <LeftTitleContent title={info.title} titleStyle={info.titleStyle} content={info.content} justContent={info.justContent} key={`m-info-${idx}`} />
        )} */}
        <View style={{ padding: COMMON_PAGE_PADDING }}>
          <CustomButton
            title="검색하기"
            onPress={() => navigation.navigate(STEP_NAVIGATE_ENUM.STEP2)}
          />
          <View>
            <Title style={{ marginVertical: 20, marginLeft: 10 }}>
              ZPC2002
            </Title>
            <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingHorizontal: 10 }}>
              <View>
                <Label
                  title="배송설치"
                  style={{ width: 80, backgroundColor: COMMON_COLOR_ENUM.MIDDLE_BLUE, marginBottom: 5 }}
                />
                <Text style={{ fontSize: COMMON_SMALL_FONT_SIZE, marginLeft: 5 }}>
                  제스파 안마의자
                </Text>
              </View>
              <View style={{ borderLeftColor: COMMON_COLOR_ENUM.LIGHT_GRAY, borderLeftWidth: 1, paddingLeft: 20 }}>
                <Text style={{ color: COMMON_COLOR_ENUM.MIDDLE_BLUE }}>
                  총 설치 대행료
                </Text>
                <Title style={{ fontSize: 16, color: COMMON_COLOR_ENUM.MIDDLE_BLUE }}>
                  352,130천원
                </Title>
              </View>
            </View>
            <Table {...props} />
          </View>
        </View>
      </CustomContainer>
    </>
  )
}

export default Presenter;

const Table = (props) => {
  return (
    <View>

    </View>
  )
}

const styles = StyleSheet.create({
  notice: { textAlign: "center", backgroundColor: COMMON_COLOR_ENUM.LIGHT_GRAY, padding: 20, borderRadius: 10, marginTop: 40 }
})