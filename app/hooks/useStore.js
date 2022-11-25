import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = (storageKey) => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(storageKey);
      return value != null ? JSON.parse(value) : null;
    } catch(e) {
      console.error(e);
      return null;
      // error reading value
    }
  }
  const storeData = async (value) => {
    try {

      await AsyncStorage.setItem(storageKey, JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  }
  return { getData, storeData };
};
export default useStore;
