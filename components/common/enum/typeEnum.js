/**
 *  DP-ADMIN 데이터 타입 정의 ENUM
 * */ 
export const DELIVERY_FEE_TYPE_ENUM = Object.freeze({
    DELIVERY: "VST",
    DELIVERY_INSTALL: "INT",
    DELIVERY_INSTALL_OPTION: "INTC",
    VISIT_INSTALL: "VSTL",
    VISIT_INSTALL_OPTION: "VSTC",
    CANCEL: "CNL",
    PRODUCT_COLLECTING: "GTH",
    EXCHANGE: "EXC",
    COURIER_DELIVERY: "PRC"
})
export const ORDER_STATUS_ENUM = Object.freeze({
    ORDER_CONFIRMATION: "INIT",
    PREPARE_DELIVERY: "READY",
    SHIPPING: "IN_TRANSIT",
    COMPLETED: "FINISHED",
    CANCEL: "CANCEL"
})
export const INVENTORY_TYPE_ENUM = Object.freeze({
    DELIVERY: "DELIVERY",
    COLLECTING: "COLLECTING",
    EXCHANGE: "EXCHANGE"
})

export const BARCODE_START_WITH_ENUM = Object.freeze({
    INCOMEING_PURCHASE_ORDER: "31"
});