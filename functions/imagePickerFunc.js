import * as ImagePicker from 'expo-image-picker';

export const callImagePicker = async () => {
  const { status } = Platform.OS !== 'web' ? await ImagePicker.requestMediaLibraryPermissionsAsync() : {};

  if (status === "granted") {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log("사진선택=>", result)
  
    return result;
  } else {
    return false
  }
}

export const callCamera = async () => {
  const { status } = Platform.OS !== 'web' ? await ImagePicker.requestCameraPermissionsAsync() : {};

  if (status === "granted") {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log("카메라 사진=>", result)
    return result;
  } else {
    return false
  }
}