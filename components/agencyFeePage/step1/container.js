import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
// import { getStorage } from "../../../functions/storageFunc";
// import { API_AGENCY_FEE, API_SCHEDULE } from "../../../envVars";
import { getStorage, getUserToken } from "../../../functions/storageFunc";
import SpinnerComponent from "../../common/util/spinner";
// import { getStorage, getUserToken } from "../../../function/storageFunc";
// import SpinnerComponent from "../../common/util/spinner/spinner";
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
  const [agencyFeeInfo, setAgencyFeeInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  /**
   * Fetch Functions
   */
  const fetchAgencyInfo = async (date) => {
    const HOST = await getStorage("host");
    // console.log("fee date?????", )
    const token = await getUserToken();
    // console.log("토큰은???", token)

    if (date && token) {
      setLoading(true)

      try {        
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch(`${HOST + API_AGENCY_FEE}?date=${date}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            // console.log("대행료 데이터 결과?????", result, date)
            setAgencyFeeInfo(result)
            setLoading(false);
          })
          .catch(error => {
            console.error("agency fee fetch error", error);
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  /**
   * Functions
   */
  const selectDate = (date) => {
    // console.log("선택???",date)
    fetchAgencyInfo(date);
  }

  /**
   * useEffect
   */
  useEffect(() => {
    if (!agencyFeeInfo) {
      fetchAgencyInfo(date);
    }
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      fetchAgencyInfo(date)
      return () => {
      };
    }, [])
  )

  return (
    <>
      {loading ?
        <SpinnerComponent />
        :
        <Presenter
          {...props}
          agencyFeeInfo={agencyFeeInfo}
          date={date}
          setDate={setDate}
          selectDate={selectDate}
          exportModalVisible={exportModalVisible}
          setExportModalVisible={setExportModalVisible} />}
    </>
  )
}

export default Container;