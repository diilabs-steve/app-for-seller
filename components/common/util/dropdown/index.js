import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { COMMON_COLOR_ENUM } from '../../enum/commonColorEnum';
import { COMMON_BORDER_RADIUS, COMMON_FONT_SIZE } from '../../enum/commonStyleEnum';
import { StyleSheet, View } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";


const Dropdown = (props) => {

    const {
        data = [],
        value = "",
        onSelect= () => {},
        defaultButtonText = "",
        buttonTextStyle = {},
        buttonStyle = {}
    } = props;
    const idx = data.map(d => d.value).indexOf(value)
    return (
          <SelectDropdown
              data={data}
              onSelect={onSelect}
              dropdownIconPosition="right"
              defaultValueByIndex={idx !== -1 ? idx : null}
              defaultButtonText={defaultButtonText}
              buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.text
              }}
              renderDropdownIcon={() => {
                return (
                  <FontAwesome name="chevron-down" color={COMMON_COLOR_ENUM.DEEP_DARK_GRAY} size={16} />
                );
              }}
              rowTextForSelection={(item = {}, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.text
              }}
              buttonStyle={[styles.dropdown1BtnStyle, buttonStyle]}
              buttonTextStyle={[styles.dropdown1BtnTxtStyle, buttonTextStyle]}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
          />
    );
};

export default Dropdown;

Dropdown.propTypes = {
    data: PropTypes.array,
    value: PropTypes.string,
    onSelect: PropTypes.func,
    defaultButtonText: PropTypes.string,
    buttonTextStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    title: PropTypes.string,
    list: PropTypes.array,
    totalList: PropTypes.array,
    rightContent: PropTypes.object
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    // width,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
  },
  headerTitle: { color: "#000", fontWeight: "bold", fontSize: 16 },
  saveAreaViewContainer: { flex: 1, backgroundColor: "#000" },
  // viewContainer: { flex: 1, width, backgroundColor: "#FFF" },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "10%",
  },

  dropdown1BtnStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COMMON_COLOR_ENUM.GRAY,
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { 
    backgroundColor: "#EFEFEF"
  },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5"
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },

  dropdown2BtnStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#444",
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown2DropdownStyle: { backgroundColor: "#444" },
  dropdown2RowStyle: { backgroundColor: "#444", borderBottomColor: "#C5C5C5" },
  dropdown2RowTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },

  dropdown3BtnStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#FFF",
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#444",
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: { width: 45, height: 45, resizeMode: "cover" },
  dropdown3BtnTxt: {
    color: "#444",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: { backgroundColor: "slategray" },
  dropdown3RowStyle: {
    backgroundColor: "slategray",
    borderBottomColor: "#444",
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  dropdownRowImage: { width: 45, height: 45, resizeMode: "cover" },
  dropdown3RowTxt: {
    color: "#F1F1F1",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginHorizontal: 12,
  },

  dropdown4BtnStyle: {
    width: "50%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown4BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown4DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown4RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown4RowTxtStyle: { color: "#444", textAlign: "left" },
});
