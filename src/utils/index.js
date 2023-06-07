import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

async function get(key, defaultValue = null) {
  try {
    let value = await AsyncStorage.getItem(key);

    if (key != 'first') {
      if (value !== null) {
        value = JSON.parse(value);
      }
    }
    return value;
  } catch (error) {
    console.log("couldn't save data: " + key, error);
  }
}

async function set(key, value) {
  try {
    if (key == 'first') {
      return await AsyncStorage.setItem(key, value);
    } else {
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.log("couldn't save data: " + key, error);
  }
}
async function clear() {
  try {
    return await AsyncStorage.clear(() => {
      console.log('cleared');
    });
  } catch (error) {
    console.log("couldn't save data: " + key, error);
  }
}

function toastAlert(type = 'success', text1, text2) {
  Toast.show({type, text1, text2});
}

export default {
  get,
  set,
  clear,
  toastAlert,
};
