import AsyncStorage from "@react-native-async-storage/async-storage";

const cleanUpToken = async () => {
    const token = await AsyncStorage.getItem("KS-token");
    const cleanedToken = token?.replace(/['"]+/g, '');

    return cleanedToken;
}

export default cleanUpToken;