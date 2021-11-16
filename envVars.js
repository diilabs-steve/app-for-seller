/**
 * HOST
 */
export const HOST = "https://devdfs.diilabs.co.kr";
export const DEMO_HOST = "https://demo.diilabs.co.kr";
export const TRIAL_HOST = "https://trial.d.diilabs.co.kr";

/**
 * USER 계정
 */
export const SIGN_IN = "/user/sign/in";
export const SIGN_UP = "/user/sign/up";
export const USER_INFO = "/user/my/info";
export const TOKEN_REFRESH = "/user/sign/refresh";

/**
 * PARTNER 거래처
 */
export const PARTNER_LIST = "/user/partner/list";
export const PARTNER = "/user/partner";

/**
 * INFRA 인프라
 */
export const INFRA = "/master/infra";

/**
 * MODEL 모델
 */
export const MODEL_LIST = "/warehouse/model/list";
export const MODEL_STOCK = "/warehouse/model/stock";
export const MODEL_STOCK_MODEL = "/warehouse/model/stock/model";
export const MODEL = "/warehouse/model";

/**
 * PURCHASE 제품 주문/입고
 */
export const PURCHASE = "/warehouse/purchase";
export const PURCHASE_LIST = "/warehouse/purchase/list";
export const PURCHASE_RECEIVE = "/warehouse/purchase/receive";
export const PURCHASE_LOCATION = "/warehouse/purchase/location";
export const PURCHASE_CONFIRM = "/warehouse/purchase/confirm";
export const PURCHASE_CANCEL_FUNC = (purchaseSeq) => `/warehouse/purchase/${purchaseSeq}` + "/receive";

/**
 * LOCATION 로케이션
 */
export const LOCATION_LIST = "/warehouse/location/list";
export const LOCATION_IN = "/warehouse/location/in";

/**
 * LINEHAUL 간선
 */
export const LINEHAUL = "/warehouse/linehaul";
export const LINEHAUL_DETAIL = "/warehouse/linehaul/detail";
export const LINEHAUL_PICKING = "/warehouse/linehaul/picking";
export const LINEHAUL_BEFORE_LOADING = "/warehouse/linehaul/beforeLoading";
export const LINEHAUL_LOADING = "/warehouse/linehaul/loading";
export const LINEHAUL_LOADING_UNLOAD = "/warehouse/linehaul/loading/unload";

/**
 * LOAN 차용
 */
export const LOAN_PICK_LIST = "/warehouse/loan/pick";

/**
 * CODEMASTER 코드마스터
 */
export const CODE_MASTER_LIST = "/master/code/list";
export const CODE_MASTER_GROUP = "/master/code/group";

/**
 * WAREHOUSE 창고
 */
export const WAREHOUSE_LIST = "/warehouse/list";
export const WAREHOUSE_FILE_LIST = (tableName, tableSeq) => `/warehouse/file/list/${tableName}/${tableSeq}`;

/**
 * PRODUCT 상품
 */
export const PRODUCT_LIST = "/order/product/list";
export const PRODUCT = "/order/product";

/**
 * ORDER 주문
 */
export const ORDER_LIST = "/order/list";