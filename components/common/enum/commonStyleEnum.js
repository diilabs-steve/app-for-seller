import { Platform } from "react-native";

/**
 * 모든 페이지 기본 패딩
 */
export const COMMON_PAGE_PADDING = 20;

/**
 * 레디우스
 */
export const COMMON_BORDER_RADIUS = 8;

/**
 * 박스 쉐도우
 */
export const COMMON_BOX_SHADOW = {
    shadowColor:  "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: .08,
    shadowRadius: 16,
    // elevation: 30,
    elevation: 10,
};

/**
 * 글자크기
 */
export const COMMON_LARGE_FONT_SIZE = 19.5;
export const COMMON_FONT_SIZE = 16.5;
export const COMMON_SMALL_FONT_SIZE = 15.5;


/**
 * input 스타일
 */
export const COMMON_INPUT_STYLE = {
        height: 60,
        padding: 10,
        paddingLeft: 20,
        borderRadius: COMMON_BORDER_RADIUS,
        width: "100%",
        // color: "#AAADBD",
        backgroundColor: "#ffffff",
        fontSize: COMMON_SMALL_FONT_SIZE,
        fontWeight: "500",
        borderWidth: 1,
        borderColor: "#D9DEE7"
}

/**
 * 스캔 페이지
 */
export const COMMON_SCAN_PAGE_BG = {
        position: "absolute",
        backgroundColor: "#F4F6F9",
        width: "120%",
        height: 350,
        borderBottomLeftRadius: 40,
        paddingTop: Platform.OS === "android" ? "15%" : "20%",
        paddingLeft: 40
    }
export const COMMON_SCAN_PAGE_CONTAINER = {
        padding: COMMON_PAGE_PADDING,
        height: "100%",
        paddingTop: 300
    }