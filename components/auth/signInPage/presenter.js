import React from 'react';
import { Text, View, Image, StyleSheet, TextInput, Platform, TouchableOpacity } from "react-native";
import { AUTH_NAVIGATE_ENUM } from '../../../navigationVar';
import CustomContainer from '../../common/util/customContainer';
import KittenButton from '../../common/util/kittenButton';
import LogoImg from "../../../assets/signin/logo.png";
import Title from '../../common/util/title';
import { COMMON_COLOR_ENUM } from '../../common/enum/commonColorEnum';
import { COMMON_BORDER_RADIUS, COMMON_BOX_SHADOW, COMMON_INPUT_STYLE, COMMON_PAGE_PADDING } from '../../common/enum/commonStyleEnum';
import CustomButton from '../../common/util/customButton';
import { HOST, DEMO_HOST } from "../../../envVars";

const Presenter = (props) => {

  const {
    navigation,
    handleSignIn,
    username,
    setUsername,
    password,
    setPassword
  } = props;

  setUsername('diilabs')
  setPassword('12345678')

  return (
    <CustomContainer style={{ height: "100%", padding: COMMON_PAGE_PADDING }}>
      <View style={styles.titleContainer}>
        <Image source={LogoImg} style={styles.logoImg} />
        <Title style={styles.title}>
          바른설치
        </Title>
        <Text style={styles.subTitle}>
          물류관리용
        </Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        // onEndEditing={onPress}
        value={username}
        placeholder={"아이디"}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder={"비밀번호"}
        secureTextEntry={true}
      />
      <CustomButton btnStyle={{ marginTop: 20 }} title="로그인" onPress={() => handleSignIn(DEMO_HOST)} />
      <CustomButton btnStyle={{ marginTop: 20 }} title="개발 로그인" onPress={() => handleSignIn(HOST)} />
      {/* <KittenButton title="회원가입" onPress={() => navigation.navigate(AUTH_NAVIGATE_ENUM.SIGNUP)} /> */}
      <View style={{ alignItems: "center" }}>
        <SubMenu />
      </View>
    </CustomContainer>
  );
};

export default Presenter;

const SubMenu = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30, width: 300 }}>
      <TouchableOpacity style={{ width: "33.3%" }}>
        <Text style={{ color: COMMON_COLOR_ENUM.DEEP_DARK_GRAY, textAlign: "center" }}>아이디 찾기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: "33.3%", borderLeftWidth: 1, borderLeftColor: COMMON_COLOR_ENUM.DEEP_DARK_GRAY }}>
        <Text style={{ color: COMMON_COLOR_ENUM.DEEP_DARK_GRAY, textAlign: "center" }}>비밀번호 찾기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: "33.3%", borderLeftWidth: 1, borderLeftColor: COMMON_COLOR_ENUM.DEEP_DARK_GRAY }}>
        <Text style={{ color: COMMON_COLOR_ENUM.DEEP_DARK_GRAY, textAlign: "center" }}>회원가입</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  logoImg: {
    width: Platform.OS === "android" ? 65 : 57,
    height: Platform.OS === "android" ? 62 : 53,
    resizeMode: "stretch"
  },
  input: {
    ...COMMON_INPUT_STYLE,
    marginBottom: 18
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Platform.OS === "android" ? "12%" : "15%",
    marginTop: "30%",
  },
  title: {
    fontSize: 34,
    marginTop: 25,
    color: COMMON_COLOR_ENUM.PRIMARY
  },
  subTitle: {
    fontSize: 20,
    color: COMMON_COLOR_ENUM.DARK_GRAY,
    marginTop: Platform.OS === "android" ? 5 : 15

  }
})