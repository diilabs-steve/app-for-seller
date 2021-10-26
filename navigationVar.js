// 계정 관련 네비게이션
export const AUTH_NAVIGATE_ENUM = Object.freeze({
    SIGNIN: "로그인",
    SIGNUP: "회원가입",
    SIGNUP_SUCCESS: "회원가입완료",
    TRIAL_SIGNIN: "트라이얼 로그인"
});

export const MAIN_NAVIGATE_ENUM = Object.freeze({
    MAIN: "홈",
    PRODUCT_INFO: "제품정보",
    GOODS_INFO: "상품정보",
    INVENTORY_INVESTIGATE: "재고조사",
    INVENTORY_MOVEMENT: "재고이동",
    PALLET_MENAGEMENT: "팔레트관리",
    CONFIRM_INCOMING_PO: "발주입고확정",
    CONFIRM_INCOMING_PROD_LOCATION: "입고제품위치확정",
    PIKING_TRUNK: "간선피킹",
    INCOMING_TRUNK: "간선입고",
    OUTGOING_TRUNK: "간선출고",
    LOAN_PICKING: "차용피킹",
    LOAN_DELIVERY: "차용출고",
    COLLECT_INCOMING: "회수입고",
    USER_PROFILE: "내정보"
});

export const STEP_NAVIGATE_ENUM = Object.freeze({
    STEP1: "step1",
    STEP2: "step2",
    STEP3: "step3",
    STEP4: "step4",
    STEP5: "step5",
    STEP6: "step6",
    STEP7: "step7",
    STEP8: "step8"
});

export const COMMON_NAVIGATE_ENUM = Object.freeze({
    BARCODE_SCANNER: "바코드 스캔"
});