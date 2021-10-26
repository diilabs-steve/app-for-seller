import { INVENTORY_TYPE_ENUM } from "./typeEnum";

/**
 *  라벨 invoice_type(배송, 회수, 교환)별 색상
 * */ 
export const LABEL_COLOR_ENUM = Object.freeze({
    [INVENTORY_TYPE_ENUM.DELIVERY]: {
        backgroundColor: "rgb(241, 243, 254)",
        color: "rgb(0, 13, 118)",
        borderColor: "rgb(233, 234, 253)"
    },
    [INVENTORY_TYPE_ENUM.COLLECTING]: {
        backgroundColor: "rgb(253, 243, 243)",
        color: "rgb(237, 92, 86)",
        borderColor: "rgb(251, 230, 230)"
    },
    [INVENTORY_TYPE_ENUM.EXCHANGE]: {
        backgroundColor: "rgb(237, 247, 248)",
        color: "rgb(80, 183, 165)",
        borderColor: "rgb(207, 232, 233)"
    }
})