import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import { getFormDate } from "../../../functions/dateObjFunc";
import { COMMON_COLOR_ENUM } from "../../common/enum/commonColorEnum";
import { commonStyles } from "../../common/styles/commonStyles";
// import { COMMON_COLOR_ENUM } from "../../common/enum/commonColorEnum";
// import { commonStyles } from "../../common/styles/commonStyles";
import Icon from "react-native-vector-icons/Ionicons";
// import { formatConvert } from "../../../function/numFunc";
// import { getFormDate } from "../../../function/dateObjFunc";
// import { AGENCY_FEE_NAVIGATE_ENUM, DELIVERY_INSTALL_LIST_NAVIGATE_ENUM } from "../../../navigationVar";
// import ExportModal from "../ExportModal";
import CustomContainer from "../../common/util/customContainer";
import LabelKittenCalendar from "../../common/util/labelKittenCalendar/labelKittenCalendar";
import { formatConvert } from "../../../functions/numFunc";

const Presenter = (props) => {

  const {
    agencyFeeInfo = {},
    date,
    setDate,
    selectDate,
    navigation,
    exportModalVisible,
    setExportModalVisible } = props;
  const {
    this_month = {},
    last_month = {},

  } = agencyFeeInfo;



  const lastMonth = last_month.install_count + last_month.exchange_collect_count + last_month.cancel_revisit_count;
  const lastMonthFee = last_month.install_fee + last_month.exchange_collect_fee + last_month.cancel_revisit_fee;

  // console.log("내려온값", agencyFeeInfo)

  const splitDate = getFormDate(new Date(), "-").split("-");

  const total = this_month.install_count + this_month.exchange_collect_count + this_month.cancel_revisit_count;
  const totalFee = this_month.install_fee + this_month.exchange_collect_fee + this_month.cancel_revisit_fee


  const AgencyFeePolicy = () => {

    const [collapse, setCollapse] = useState(false);

    return (
      <>
        <TouchableOpacity onPress={() => {
          if (collapse) {
            setCollapse(false);
          } else {
            setCollapse(true);
          }
        }} style={{ flexDirection: "row" }}>
          <Text style={[commonStyles.defaultTxt]}>
            설치대행료 지급정책
          </Text>
          <Icon name={collapse ? "chevron-up-outline" : "chevron-down-outline"} style={{ position: "absolute", right: 0, color: COMMON_COLOR_ENUM.GRAY }} size={20} />
        </TouchableOpacity>
        {collapse &&
          <View style={{ padding: 10, backgroundColor: "white" }}>
            <Text style={{ color: COMMON_COLOR_ENUM.DARK_GRAY, marginBottom: 10 }}>① 대행료는 설치월 마감 기준 47일 이후 등록된 기사님의 개별 계좌로 입금됩니다. (계좌 확인 필수)</Text>
            <Text style={{ color: COMMON_COLOR_ENUM.DARK_GRAY, marginBottom: 10 }}>② 미처리건은 대행료 지급에서 제외되며 소급적용되지 않습니다. 당일 발생건은 당일 발생을 원칙으로 하나 당일 미처리건에 대해 익월 근무일 기준 3일 내 시스템에서 완료 여부를 점검하시고 오류가 있을시 반드시 센터장님을 통해 알려주셔야 정상적으로 대행료 지급이 됩니다.</Text>
            <Text style={{ color: COMMON_COLOR_ENUM.DARK_GRAY, marginBottom: 10 }}>③ 출고차용 이후 박스 미개봉된 회수 완료된 건에 대해 건당 11,000원 지급해 드립니다.</Text>
            <Text style={{ color: COMMON_COLOR_ENUM.DARK_GRAY, marginBottom: 10 }}>④ 설치 완료된 건 중 고객 요청에 따른 재 방문건은 1회에 한해 건당 11,000원 지급해 드립니다.</Text>
            <Text style={{ color: COMMON_COLOR_ENUM.DARK_GRAY, marginBottom: 10 }}>⑤ 출고 차용 후 회수 완료 처리 되지 않은 건에 대해서는 대행료가 지급되지 않습니다.</Text>
            <Text style={{ color: COMMON_COLOR_ENUM.DARK_GRAY, marginBottom: 10 }}>⑥ 센터장님과 기사님 사이에 확인된 재고 손실에 따른 비용 발생시 기사 대행료는  지급되지 않으며  손실비용은 센터 대행료와 상계하여 처리합니다.</Text>
            <Text style={{ color: COMMON_COLOR_ENUM.DARK_GRAY, marginBottom: 10 }}>(예. 시스템상 회수처리 안된 건은 매월 말일 강제 완료처리 후 재고 매입금액과 센터 대행료와 상계처리 )</Text>
            <Text style={{ color: COMMON_COLOR_ENUM.DARK_GRAY, marginBottom: 10 }}>⑦ 데이터 오입력, 프로세스 미준수에 따라 발생시 기사 대행료는 지급되지 않으며 관련 손실비용은 센터 대행료에서  상계처리하여 지급됩니다.</Text>
            <Text style={{ color: COMMON_COLOR_ENUM.DARK_GRAY, marginBottom: 10 }}>(예. 출고차용시 바코드 미출고로 인해 고객집에 안마의자 러그가 배송되지 않아 고객이 설치 후 환불 요청한 건에 대한 제품 손실 비용 등)</Text>
          </View>
        }
      </>
    )
  }

  const TotalInstall = (props) => {

    const { title, count, divider, style, symbol = false } = props;

    return (
      <View style={[{ width: "50%", borderRightWidth: divider && 1, borderRightColor: divider && COMMON_COLOR_ENUM.GRAY }, style]}>
        <Text style={[commonStyles.defaultTxt, { textAlign: "center", color: count >= 0 ? COMMON_COLOR_ENUM.PRIMARY : "red", fontSize: 18, marginBottom: 5 }]}>
          {`${(!symbol && count >= 0) ? `+${formatConvert(count)}` : count < 0 ? `${formatConvert(count)}` : formatConvert(count)}`}
        </Text>
        <Text style={[commonStyles.defaultTxt, { textAlign: "center", fontWeight: "500", color: COMMON_COLOR_ENUM.DARK_GRAY, marginBottom: 10 }]}>
          {title}
        </Text>
      </View>
    )
  }

  const AgencyFeeTotal = (props) => {

    const { title, count, countSign, divider, symbol = false } = props;

    return (
      <View style={{ width: "33.3%", borderRightWidth: divider && 1, borderRightColor: divider && COMMON_COLOR_ENUM.GRAY }}>
        <Text style={[commonStyles.defaultTxt, { textAlign: "center", fontWeight: "500", color: COMMON_COLOR_ENUM.DARK_GRAY, marginBottom: 10 }]}>
          {title}
        </Text>
        <Text style={[commonStyles.defaultTxt, { textAlign: "center", fontSize: 18, marginBottom: 5, color: countSign ? count >= 0 ? COMMON_COLOR_ENUM.PRIMARY : "red" : "black" }]}>
          {`${(!symbol && countSign) ? count >= 0 ? `+${formatConvert(count)}` : `${formatConvert(count)}` : formatConvert(count)}`}
        </Text>
      </View>
    )
  }

  const AgencyFeeDetail = (props) => {

    const { title, count, total, divider } = props;

    return (
      <View style={{ width: "33.3%", borderRightWidth: divider && 1, borderRightColor: divider && COMMON_COLOR_ENUM.GRAY }}>
        <Text style={[commonStyles.defaultTxt, { textAlign: "center", fontWeight: "500", color: COMMON_COLOR_ENUM.DARK_GRAY, marginBottom: 10 }]}>
          {title}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={[commonStyles.defaultTxt, { textAlign: "center", fontSize: 18, marginBottom: 5 }]}>
            {formatConvert(count)}
          </Text>
          <Text style={[commonStyles.defaultTxt, { textAlign: "center", fontSize: 14, fontWeight: "400", marginTop: 4 }]}>
            건
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={[commonStyles.defaultTxt, { textAlign: "center", fontSize: 18, marginBottom: 5 }]}>
            {`${formatConvert(total)}`}
          </Text>
          <Text style={[commonStyles.defaultTxt, { textAlign: "center", fontSize: 14, fontWeight: "400", marginTop: 4 }]}>
            천원
          </Text>
        </View>
      </View>
    )
  }

  const totalInstall = [
    {
      title: "전월",
      count: lastMonth,
      style: { paddingLeft: 30 },
      divider: true,
      symbol: true

    },
    {
      title: "전월대비",
      count: total - lastMonth,
      style: { paddingRight: 30 },
    }
  ]

  const agencyFeeTotal = [
    {
      title: "누적액",
      count: (totalFee) ? ((totalFee) / 1000) | 0 : 0,
      divider: true
    },
    {
      title: "전월",
      count: (lastMonthFee) ? ((lastMonthFee) / 1000) | 0 : 0,
      divider: true,
      symbol: true
    },
    {
      title: "전월대비",
      count: (totalFee - lastMonthFee) ? ((totalFee - lastMonthFee) / 1000) | 0 : 0,
      countSign: true
    }
  ]

  const agencyFeeDetail = [
    {
      title: "설치",
      count: this_month.install_count,
      total: this_month.install_fee ? (this_month.install_fee / 1000) | 0 : 0,
      divider: true
    },
    {
      title: "교환/회수",
      count: this_month.exchange_collect_count,
      total: this_month.exchange_collect_fee ? (this_month.exchange_collect_fee / 1000) | 0 : 0,
      divider: true
    },
    {
      title: "취소/재방문",
      count: this_month.cancel_revisit_count,
      total: this_month.cancel_revisit_fee ? (this_month.cancel_revisit_fee / 1000) | 0 : 0
    }
  ]
  return (
    <>
      {/* <ExportModal visible={exportModalVisible} setVisible={setExportModalVisible} /> */}
      <ScrollView>
        <CustomContainer style={{ resizeMode: 'cover', backgroundColor: "white", paddingVertical: 15 }}>
          <LabelKittenCalendar
            title="날짜"
            date={date}
            setDate={setDate}
            selectDate={selectDate}
            labelWidth="25%"
            contentWidth="74%"
          />
          <View style={{ marginHorizontal: 20, borderWidth: 1, borderRadius: 20, padding: 10, borderColor: COMMON_COLOR_ENUM.GRAY, marginTop: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={[commonStyles.defaultTxt, { fontWeight: "500", color: COMMON_COLOR_ENUM.PRIMARY }]}>
                {`${this_month && this_month.unfinish_count ? this_month.unfinish_count : 0}`}
              </Text>
              <Text style={[commonStyles.defaultTxt, { fontWeight: "500" }]}>
                건의 미정리 설치건이 있습니다.
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <TouchableOpacity onPress={() => {
              navigation.navigate(AGENCY_FEE_NAVIGATE_ENUM.UNFINISHED_INSTALL, {
                date
              })
            }}>
              <Text style={[commonStyles.defaultTxt, { fontWeight: "bold", color: COMMON_COLOR_ENUM.PRIMARY, textDecorationLine: "underline", fontSize: 18 }]}>
                보러가기
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontWeight: "700", fontSize: 18, textAlign: "center", marginTop: 0, marginBottom: 10, color: "black" }}>
              {`${date ? date.toISOString().split("-")[1] + "월" : ""} 총 설치건수`}
            </Text>
            {/* <TouchableOpacity onPress={() => {
                        setExportModalVisible(true);
                    }}>
                        <Image source={DownloadImg} style={{ width: 23, height: 23, resizeMode: "stretch", marginBottom: 5, marginLeft: 10 }} />
                    </TouchableOpacity> */}
          </View>
          <Text style={{ fontWeight: "700", fontSize: 24, textAlign: "center", color: COMMON_COLOR_ENUM.PRIMARY }}>
            {`${total ? total : 0}`}
          </Text>

          <View style={{ alignItems: "center", paddingTop: 20 }}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              {totalInstall.map((d, idx) =>
                <TotalInstall
                  key={`tti-${idx}`}
                  title={d.title}
                  count={d.count}
                  style={d.style}
                  divider={d.divider}
                  symbol={d.symbol}
                />
              )}
            </View>
          </View>
        </CustomContainer>
        <CustomContainer style={{ backgroundColor: "white", padding: 20, marginTop: 7 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[commonStyles.defaultTxt]}>
              설치대행료 총액
            </Text>
            <Text style={[{ color: COMMON_COLOR_ENUM.DARK_GRAY, marginLeft: 5 }]}>
              (단위: 천원)
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row", width: "100%", marginTop: 20 }}>
              {agencyFeeTotal.map((d, idx) =>
                <AgencyFeeTotal
                  key={`aft-${idx}`}
                  title={d.title}
                  count={d.count}
                  divider={d.divider}
                  countSign={d.countSign}
                  symbol={d.symbol}
                />
              )}
            </View>
          </View>
        </CustomContainer>
        <CustomContainer style={{ backgroundColor: "white", padding: 20, marginTop: 7 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[commonStyles.defaultTxt]}>
              설치대행료 상세
            </Text>
            {/* <Text style={[{ color: COMMON_COLOR_ENUM.DARK_GRAY, marginLeft: 5 }]}>
                        (단위: 건, 천원)
                    </Text> */}
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row", width: "100%", marginTop: 20 }}>
              {agencyFeeDetail.map((d, idx) =>
                <AgencyFeeDetail
                  key={`afd-2-${idx}`}
                  title={d.title}
                  divider={d.divider}
                  count={d.count}
                  total={d.total}
                />
              )}
            </View>
          </View>
        </CustomContainer>
        <CustomContainer style={{ backgroundColor: "white", padding: 20, marginTop: 7 }}>
          <AgencyFeePolicy />
        </CustomContainer>
      </ScrollView>
    </>
  )
}

export default Presenter;