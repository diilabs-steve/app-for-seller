import axios from "axios";
import { CODE_MASTER_GROUP, HOST, INFRA, LINEHAUL, LINEHAUL_BEFORE_LOADING, LINEHAUL_DETAIL, LINEHAUL_LOADING, LINEHAUL_LOADING_UNLOAD, LINEHAUL_PICKING, LOAN_PICK_LIST, LOCATION_IN, LOCATION_LIST, MODEL_LIST, MODEL_STOCK, PARTNER_LIST, PRODUCT, PRODUCT_LIST, PURCHASE, PURCHASE_CONFIRM, PURCHASE_LIST, PURCHASE_LOCATION, PURCHASE_RECEIVE, SIGN_IN, TOKEN_REFRESH, USER_INFO, WAREHOUSE_LIST } from "../../../envVars";
import { getStorage, getUserToken, setUserToken } from "../../../functions/storageFunc";
import { getRefreshToken, setRefreshToken } from "./storageFunc";

/**
 * USER 계정
 */
export const postSignin = async (HOST, userId, password) => {
    
    console.log("아이디", userId, password)
    try {
        const rs = await axios.post(HOST + SIGN_IN, {
            userId,
            password
        });

        const result = rs.data || {};
        
        console.log(userId, password, result)

        if(result.result === false) {
            return {
                status: false
            };
        } else {
            setUserToken(rs.data.accessToken);
            setRefreshToken(rs.data.refreshToken);
    
            return {
                data: result,
                status: true
            }
        }
    } catch (error) {
        return {
                status: false
        };
    }
}
export const fetchUserInfo = async () => {
    const HOST = await getStorage("host");
    const token = await getUserToken();

    try {
        const rs = await axios.get(HOST + USER_INFO, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        const result = rs.data || {}

        return {
            data: result,
            status: true
        }

    } catch (error) {
        const isTokenExist = await postTokenRefresh();

        if (isTokenExist.status) {
            fetchUserInfo();
        } else {
            return {
                status: false
            }
        }

    }
}
export const postTokenRefresh = async () => {
    const HOST = await getStorage("host");
    const refreshToken = await getRefreshToken();

    try {
        const rs = await axios.post(HOST + TOKEN_REFRESH, null, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });
        
        const result = rs.data || {};

        setUserToken(result.accessToken);
        setRefreshToken(result.refreshToken);
        
        return {
            data: result,
            status: true
        }

    } catch (error) {
        console.log("refresh error", error)
        return {
            status: false
        }
    }
}
export const checkUserToken = async () => {
    const HOST = await getStorage("host");
    const rs = await fetchUserInfo();
    return rs.status;
}



/**
 * PURCHASE ORDER 주문/발주
 */
export const checkBarcodeOnPo = async (barcode) => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + PURCHASE_LIST);
        // console.log(rs.data)

        const result = rs.data || [];
        
        const idx = result.map(rs => `${rs.purchaseSeq}`).indexOf(barcode.trim());

        if (idx !== -1) {
            return {
                data: result[idx],
                status: true
            }
        } else return {
                status: false
            };
        
    } catch (error) {
        return {
                status: false
        };
    }
}
export const fetchPoList = async (params = "") => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + PURCHASE_LIST + params);
        // console.log(rs.data)

        const result = rs.data || [];
        

        return {
            data: result,
            status: true
        }
        
    } catch (error) {
        return {
                status: false
        };
    }
}
export const fetchPoDetail = async (purchaseSeq) => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + PURCHASE + `/${purchaseSeq}`);

        const result = rs.data || {};

        return {
            data: result,
            status: true
        }
        
    } catch (error) {
        return {
                status: false
        };
    }
}
export const postConfirmIncomingPo = async (data = {}) => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.post(HOST + PURCHASE_RECEIVE, data);

        const result = rs.data || [];

        postForceConfirmIncomingPo({
            "purchaseDetailSeq": data.purchaseDetailSeq,
            "description": ""
        });
        console.log("result^^^>", result)
        return {
            ...result,
            status: true
        }
        
    } catch (error) {
        return {
                status: false
        };
    }
}
export const postForceConfirmIncomingPo = async (data = {}) => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.post(HOST + PURCHASE_CONFIRM, data);

        const result = rs.data || {};

        console.log("result^^^>", result)
        return {
            data: result,
            status: true
        }
        
    } catch (error) {
        return {
                status: false
        };
    }
}
export const postPurchaseLocation = async (data = {}) => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.post(HOST + PURCHASE_LOCATION, data);

        const result = rs.data || {};
        console.log("result^^^>", result)

        return {
            data: result,
            status: true
        }
        
    } catch (error) {
        return {
                status: false
        };
    }
}

/**
 * MODEL 모델
 */
export const fetchModelInfo = async (params = "") => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + MODEL_LIST + params);

        const result = rs.data || [];

        if (result.length > 0){
            return {
                data: result,
                status: true
            }
        } else {
            return {
                status: false
            };
        }
        
    } catch (error) {
        return {
                status: false
            };
    }
}
export const fetchModelStockInfo = async (params = "") => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + MODEL_STOCK + params);

        const result = rs.data || [];

        if (result.length > 0){
            return {
                data: result,
                status: true
            }
        } else {
            return {
                status: false
            };
        }
        
    } catch (error) {
        return {
                status: false
            };
    }
}

/**
 * LOCATION 로케이션
 */
export const fetchLocationList = async (centerCode) => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + LOCATION_LIST + `/${centerCode}`);
        // console.log(rs.data)

        const result = rs.data || [];
        

        return {
            data: result,
            status: true
        }
        
    } catch (error) {
        return {
                status: false
        };
    }
}

/**
 * WAREHOUSE 창고
 */
export const fetchWarehouseList = async (params = "") => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + WAREHOUSE_LIST + params);
        // console.log(rs.data)

        const result = rs.data || [];
        

        return {
            data: result,
            status: true
        }
        
    } catch (error) {
        console.log("warehouse fetch error", error)
        return {
                status: false
        };
    }
}

/**
 * CODEMASTER 코드마스터
 */
export const fetchCodeMasterGroupData = async (codeGroup, type) => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + CODE_MASTER_GROUP + `/${codeGroup}`);

        const result = rs.data || {};
        
        // console.log("fetchcodemaster", result)
        if (type === "object") {
            const obj = {};
            rs.data.codes.forEach(c => {
                Object.assign(obj, {
                    [c.code]: c.codeName,
                    [c.codeName]: c.code
                })
            });
            return {
                status: true,
                data: obj
            };
        } else {
            return {
                data: result.codes,
                status: true
            }
        }
        
    } catch (error) {
        return {
                status: false
        };
    }
}

/**
 * PARTNER 거래처
 */
export const fetchPartnerList = async (params = "") => {
    const HOST = await getStorage("host");
    const token = await getUserToken();

    try {
        const rs = await axios.get(HOST + PARTNER_LIST + params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const result = rs.data || [];

        console.log("result^^^>", result)
        return {
            data: result,
            status: true
        }
        
    } catch (error) {
        return {
                status: false
        };
    }
}

/**
 * 
 * INFRA 인프라
 */
export const fetchInfraList = async () => {
    const HOST = await getStorage("host");
    const token = await getUserToken();

    try {
        const rs = await axios.get(HOST + INFRA);

        const result = rs.data || [];

        console.log("result^^^>", result)
        return {
            data: result,
            status: true
        }
        
    } catch (error) {
        return {
                status: false
        };
    }
}

/**
 * LINEHAUL 간선
 */
export const fetchLineHaulList = async (params = "") => {
    const HOST = await getStorage("host");
    console.log(params)
    try {
        const rs = await axios.get(HOST + LINEHAUL + params);

        const result = rs.data || [];
        console.log(result)
        if (result.length > 0){
            return {
                data: result,
                status: true
            }
        } else {
            return {
                status: false
            };
        }
        
    } catch (error) {
        console.log(error)
        return {
                status: false
            };
    }
}
export const fetchLineHaulDetail = async (params = "") => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + LINEHAUL_DETAIL + params);

        const result = rs.data || {};

        return {
            data: result,
            status: true
        }
    
    } catch (error) {
        return {
                status: false
            };
    }
}
export const fetchLineHaulPickingDetail = async (params = "") => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + LINEHAUL_PICKING + params);

        const result = rs.data || {};

            return {
                data: result,
                status: true
            }
        
    } catch (error) {
        return {
                status: false
            };
    }
}
export const postPickingConfirm = async (body = {}) => {
    const HOST = await getStorage("host");
    console.log('pickingpost body', body)
    try {
        const rs = await axios.put(HOST + LINEHAUL_PICKING, body);

        const result = rs.data || {};
        console.log("pickingpost data=>", rs.data, body)
            return {
                data: result,
                status: true
            }
        
    } catch (error) {
        console.log("pickingpost erroe=>", error)
        return {
                status: false
            };
    }
}
export const postLoadingConfirm = async (body = {}) => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.put(HOST + LINEHAUL_LOADING, body);

        const result = rs.data || {};
        console.log("loading post data=>", rs.data)
            return {
                data: result,
                status: true
            }
        
    } catch (error) {
        console.log("loading post erroe=>", error)
        return {
                status: false
            };
    }
}
export const fetchLineHaulBeforeLoadingList = async (loadingStatementSeq) => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + LINEHAUL_BEFORE_LOADING + `/${loadingStatementSeq}`);

        const result = rs.data || {};

            return {
                data: result,
                status: true
            }
        
    } catch (error) {
        return {
                status: false
            };
    }
}
export const fetchLineHaulLoadingUnloadList = async (params = "") => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + LINEHAUL_LOADING_UNLOAD + params);

        const result = rs.data || [];

        if (result.length > 0) {
            return {
                data: result,
                status: true
            }
        } else {
            return {
                status: false
            }
        }
        
    } catch (error) {
        return {
                status: false
            };
    }
}
export const fetchLineHaulLoadingUnloadModelList = async (transportStatementSeq = "") => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + LINEHAUL_LOADING_UNLOAD + `/${transportStatementSeq}`);

        const result = rs.data || [];
        console.log("haul????", result)
        if (result.length > 0) {
            return {
                data: result,
                status: true
            }
        } else {
            return {
                status: false
            }
        }
        
    } catch (error) {
        return {
                status: false
            };
    }
}
export const postUnloadConfirm = async (body = {}) => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.post(HOST + LINEHAUL_LOADING_UNLOAD, body);

        const result = rs.data || {};
        console.log("loading post data=>", rs.data)
            return {
                data: result,
                status: true
            }
        
    } catch (error) {
        console.log("loading post erroe=>", error)
        return {
                status: false
            };
    }
}

/**
 * 
 * LOAN 차용
 */
export const fetchLoanPickingList = async (loanSeq) => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + LOAN_PICK_LIST + `/${loanSeq}`);

        const result = rs.data || [];
        console.log("result", result)
        if (result.length > 0) {
            return {
                data: result,
                status: true
            }
        } else {
            return {
                status: false
            }
        }
        
    } catch (error) {
        console.log("fetch loan picking list error", error)
        return {
                status: false
            };
    }
}
export const postLoanPickingSave = async (data) => {
    const HOST = await getStorage("host");
    console.log("result", data)
    try {
        const rs = await axios.put(HOST + LOAN_PICK_LIST, data);
        // const rs = await axios.put(HOST + LOAN_PICK_LIST, data);

        const result = rs.data || {};
        console.log("fetch loan picking list", result)
        return {
            data: result,
            status: true
        }
        
    } catch (error) {
        console.log("fetch loan picking list error", error)
        return {
                status: false
            };
    }
}

/**
 * PRODUCT 상품
 */
export const fetchProductList = async (params = "") => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + PRODUCT_LIST + params);

        const result = rs.data || [];

        if (result.length > 0){
            return {
                data: result,
                status: true
            }
        } else {
            return {
                status: false
            };
        }
        
    } catch (error) {
        console.log("product list fetch erroe=>", error)
      
        return {
                status: false
            };
    }
}
export const fetchProductDetail = async (productSeq) => {
    const HOST = await getStorage("host");
    try {
        const rs = await axios.get(HOST + PRODUCT + "/" + productSeq);

        const result = rs.data || {};

            return {
                data: result,
                status: true
            }
        
    } catch (error) {
        console.log("product detail fetch erroe=>", error)
      
        return {
                status: false
            };
    }
}

/**
 * REST API OBJ
 */
export const restApiObjectConverter = async (api, settingObj = { key: "", value: "" }) => {

    const HOST = await getStorage("host");
    const token = await getUserToken();

    try {
        const rs = await axios.get(HOST + api, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const obj = {};
        rs.data?.forEach(d => {
            Object.assign(obj, {
                [d[settingObj.key]]: d[settingObj.value],
                [d[settingObj.value]]: d[settingObj.key]
            })
        })
        console.log('????restr',rs.data, obj)
        return {
            data: obj,
            status: true
        }
        
    } catch (error) {
        return {
                status: false
        };
    }

}