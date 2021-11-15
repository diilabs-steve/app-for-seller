import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { formatConvert } from "../../../functions/numFunc";
import { STEP_NAVIGATE_ENUM } from "../../../navigationVar";
import { COMMON_COLOR_ENUM } from "../../common/enum/commonColorEnum";
import { COMMON_BORDER_RADIUS, COMMON_BOX_SHADOW, COMMON_PAGE_PADDING, COMMON_SMALL_FONT_SIZE } from "../../common/enum/commonStyleEnum";
import CustomButton from "../../common/util/customButton";
import CustomContainer from "../../common/util/customContainer";
import Label from "../../common/util/label";
import LeftTitleContent from "../../common/util/leftTitleContent";
import Title from "../../common/util/title";

const Presenter = (props) => {

  const { navigation } = props;

  return (
    <ScrollView>
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
                  {`${formatConvert(352130)}천원`}
                </Title>
              </View>
            </View>
            <View style={COMMON_BOX_SHADOW}>
              <Table {...props} />
            </View>
          </View>
        </View>
      </CustomContainer>
    </ScrollView>
  )
}

export default Presenter;

const Table = (props) => {

  const {
    tableInfo = []
  } = props;

  const COMMON_COL_WIDTH = "20%";
  const COMMON_COL_STYLE = {
    width: "18%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50
  };
  const COMMON_TEXT_STYLE = {
    textAlign: "center",
    fontSize: 13
  };

  return (
    <View style={[{  
      backgroundColor: "white",
      borderRadius: COMMON_BORDER_RADIUS,
      marginTop: 30 
    }, COMMON_BOX_SHADOW]}>
      {tableInfo.map((info, idx) =>
        <View style={{ backgroundColor: idx === 0 ? COMMON_COLOR_ENUM.LIGHT_GRAY : info.isSum ? COMMON_COLOR_ENUM.LIGHT_BLUE : "white", flexDirection: "row", borderBottomWidth: idx !== tableInfo.length - 1 ? 1 : 0, borderBottomColor: COMMON_COLOR_ENUM.GRAY }}>
          <View style={[COMMON_COL_STYLE, { width: "26%", borderRightWidth: 1, borderRightColor: COMMON_COLOR_ENUM.GRAY }]}>
              <Text style={COMMON_TEXT_STYLE, { color: info.isSum ? COMMON_COLOR_ENUM.MIDDLE_BLUE : "black" }}>
                {`${info.col1}`}
              </Text>
          </View>
          <View style={[COMMON_COL_STYLE, { width: "17.5%" }]}>
              <Text style={[COMMON_TEXT_STYLE, { color: info.isSum ? COMMON_COLOR_ENUM.MIDDLE_BLUE : "black" }]}>
                {`${typeof info.col2 === "number" ? formatConvert(info.col2) : info.col2}`}
              </Text>
          </View>
          <View style={[COMMON_COL_STYLE, { width: "17.5%" }]}>
              <Text style={[COMMON_TEXT_STYLE, { color: info.isSum ? COMMON_COLOR_ENUM.MIDDLE_BLUE : "black" }]}>
                {`${typeof info.col3 === "number" ? formatConvert(info.col3) : info.col3}`}
              </Text>
          </View>
          <View style={[COMMON_COL_STYLE, { width: "19.5%" }]}>
              <Text style={[COMMON_TEXT_STYLE, { color: info.isSum ? COMMON_COLOR_ENUM.MIDDLE_BLUE : "black" }]}>
                {`${typeof info.col4 === "number" ? formatConvert(info.col4) : info.col4}`}
              </Text>
          </View>
          <View style={[COMMON_COL_STYLE, { width: "19.5%" }]}>
              <Text style={[COMMON_TEXT_STYLE, { color: info.isSum ? COMMON_COLOR_ENUM.MIDDLE_BLUE : "black" }]}>
                {`${typeof info.col5 === "number" ? formatConvert(info.col5) : info.col5}`}
              </Text>
          </View>
        </View>
    )}
    </View>
  )
}

const styles = StyleSheet.create({
  notice: { textAlign: "center", backgroundColor: COMMON_COLOR_ENUM.LIGHT_GRAY, padding: 20, borderRadius: 10, marginTop: 40 }
})