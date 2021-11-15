import { StyleSheet } from "react-native";
import { COMMON_COLOR_ENUM } from "../enum/commonColorEnum";

export const commonStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding:20,
      backgroundColor: '#fff',
    },
    textInput: {
      // flex: 1,
      width: "100%",
      height: 42,
      borderColor: '#f4f5f7',
      borderWidth: 1,
      borderRadius: 8,
      padding: 8,
      backgroundColor: '#f4f5f7'
    },
    btn: {
        width: "100%",
        borderRadius: 6
    },
    defaultTxt: {
        fontSize: 16,
        fontWeight: "600"
    },
    boxShadow: {
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2,
    },
    btnActive : {
      backgroundColor: COMMON_COLOR_ENUM.ACTIVE_BUTTON_COLOR,
      borderColor: COMMON_COLOR_ENUM.ACTIVE_BUTTON_BORDER_COLOR,
      borderWidth: 2
    }
  });