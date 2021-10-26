import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { COMMON_COLOR_ENUM } from '../../enum/commonColorEnum';
import { COMMON_BORDER_RADIUS, COMMON_FONT_SIZE } from '../../enum/commonStyleEnum';
import { Alert, SafeAreaView } from 'react-native';

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
        <>
        {/* <SafeAreaView>
        <SearchableDropdown
            onItemSelect={(item) => {
              onSelect(item);
            }}
            setSort={(item, searchedText)=> item.genre.toLowerCase().startsWith(searchedText.toLowerCase())}
            containerStyle={{ }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={data}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                value: value,
                placeholder: "placeholder",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
                onTextChange: text => {
                    onSelect({ name: text, value: text});
                }
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
        </SafeAreaView> */}
        <SelectDropdown
            data={data}
            onSelect={onSelect}
            defaultValueByIndex={idx !== -1 ? idx : null}
            defaultButtonText={defaultButtonText}
            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem.text
            }}
            rowTextForSelection={(item = {}, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item.text
            }}
            buttonTextStyle={[{
                textAlign: "left",
                paddingLeft: 5,
                fontSize: COMMON_FONT_SIZE,
                color: value ? "black" : COMMON_COLOR_ENUM.MIDDLE_GRAY
            }, buttonTextStyle]}
            buttonStyle={[{
                backgroundColor: "white",
                borderColor: "#D9DEE7",
                borderWidth: 1,
                borderRadius: COMMON_BORDER_RADIUS,
                height: 44,
                zIndex:100
            }, buttonStyle]}
            dropdownStyle={{ zIndex: 100 }}
            rowStyle={{ zIndex: 100 }}
            rowTextStyle={{ zIndex: 100 }}
        />
        </>
    );
};

export default Dropdown;