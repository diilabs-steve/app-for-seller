import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);

      return true;
    } catch (e) {
      console.error("Set AsyncStorage Fail.", e);
      
      return false;
    }
}

export const getStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        console.log("getStorage??", value)
        if(value !== null) {
            return value;
        }
    } catch(e) {
        console.error("Get AsyncStorage Fail.", e);

        return false;
    }
}

export const setUserToken = async (token) => {
    try {
      await AsyncStorage.setItem("@accessToken", token);

      return true;
    } catch (e) {
      console.error("Set UserToken Fail.", e);
      
      return false;
    }
}

export const getUserToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@accessToken');
        console.log("getToken", value)
        if(value !== null) {
            return value;
        }
    } catch(e) {
        console.error("Get UserToken Fail.", e);

        return false;
    }
}

export const removeUserToken = async () => {
    try {
      await AsyncStorage.setItem("@accessToken", "");

      return true;
    } catch (e) {
      console.error("Remove UserToken Fail.", e);
      
      return false;
    }
}
export const clearStorage = async () => {
    AsyncStorage.clear();

    return true;
}