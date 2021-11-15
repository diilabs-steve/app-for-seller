import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { COMMON_COLOR_ENUM } from "../../common/enum/commonColorEnum";
import { COMMON_INPUT_STYLE } from "../../common/enum/commonStyleEnum";
import LabelKittenCalendar from "../../common/util/labelKittenCalendar/labelKittenCalendar";
import Presenter from "./presenter";

const Container = (props) => {

  /**
   * Props
   */
  const { route } = props;
  const { params = {} } = route;
  const { } = params

  /**
   * States
   */
  // Fetch State
  const [date, setDate] = React.useState(new Date());
  const [model, setModel] = React.useState("");

  const selectDate = () => {

  }

  const searchInfo = [
    {
      title: "연/월",
      content: (
        <LabelKittenCalendar
          title="날짜"
          date={date}
          setDate={setDate}
          selectDate={selectDate}
          labelWidth="25%"
          contentWidth="75%"
          labelTextStyle={{
            fontSize: 16,
            color: COMMON_COLOR_ENUM.DARK_GRAY
          }}
        />  
      ),
      justContent: true
    },
    {
      title: "모델",
      content: (
        <TextInput
          style={[COMMON_INPUT_STYLE, { height: 45 }]}
          onChangeText={setModel}
          value={model}
          placeholder={"입력하기"}
          secureTextEntry={true}
        />
      ),
      titleStyle: {
        textAlign: "center",
        width: "25%"
      }
    },
  ]

  return (
    <>
        <Presenter
          {...props}
          searchInfo={searchInfo}
        />
    </>
  )
}

export default Container;