/**
 * 업무공통부
 *
 */

import { useEffect, useRef } from 'react';
import { Alert, Platform, ToastAndroid, Share, Image } from 'react-native';
import twconfig from '../../../tailwind.config';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-picker';

/**
 * 색상 문자열 값을 반환합니다.
 * @param {String} s 색상 문자열. 'red', 'primary', 'point-red', 'text-gray-300' 등
 */
export const getColor = (s: string) => {
  let res = twconfig?.theme?.colors[s];
  if (!res && twconfig?.theme?.extend) {
    res = twconfig?.theme?.extend?.colors[s];
  }
  if (!res && String(s).indexOf('-') > -1) {
    let splits = String(s).split('-');
    // console.log('splits', splits);
    // console.log('twconfig.theme.colors', twconfig.theme.colors);
    res = twconfig?.theme?.colors[splits[0]][splits[1]];
  }
  // console.debug('getColor', s, res);
  return res;
};

/**
 * Alert 창을 호출한다.
 * @param title   Alert Title
 * @param message Alert Message
 * @param buttons Buttons Array.
 */
export const makeAlert = (title: string, message: string, buttons: any) => {
  Alert.alert(
    title,
    message, // Message
    buttons || [{ text: '확인' }], // Buttons
    { cancelable: false },
  );
};

export const makeToast = (message: string) => {
  if (Platform.OS === 'android') {
    // ToastAndroid.show(message, ToastAndroid.SHORT);
    ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 200);
  } else {
    Alert.alert(message, '', [{ text: '확인', style: 'cancel' }]);
  }
};

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        // console.log('getCurrentPosition', position.coords.latitude, position.coords.longitude);
        resolve(position);
      },
      (error) => {
        console.debug('getCurrentPosition', error.code, error.message);
        reject(error);
        return;
      },
      { enableHighAccuracy: true, timeout: 3600000, maximumAge: 3600000 },
    );
  });
};

/**
 * 실행 디바이스가 시뮬레이터인지 확인
 */
export const isSimulator = () => {
  // https://github.com/react-native-community/react-native-device-info#isemulator
  return DeviceInfo.isEmulatorSync();
};

/**
 * 빈 오브젝트인지 확인
 * @param {Object} param
 */
export const isEmptyObject = (param: any) => {
  return Object.keys(param).length === 0 && param.constructor === Object;
};

/**
 * 아이템명으로 AsyncStorage.getItem 한다.
 * @param {String} itemName 가져올 아이템명
 */
export const getItemFromStorage = (itemName: string) => {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(itemName, (error, itemObject) => {
        if (!error) {
          resolve(JSON.parse(itemObject || {}));
        } else {
          console.debug('error getItemFromStorage', error);
          reject(error);
        }
      });
    } catch (error) {
      console.debug('error getItemFromStorage', error);
      reject(error);
    }
  });
};

/**
 * 아이템명으로 AsyncStorage.setItem 한다.
 * @param {String} itemName 저장할 아이템명
 * @param {Object} itemObject 저장할 객체
 */
export const setItemToStorage = (itemName: string, itemObject: any) => {
  (async () => {
    try {
      if (itemObject) {
        await AsyncStorage.setItem(itemName, JSON.stringify(itemObject || {}));
      }
    } catch (error) {
      console.debug('error setItemToStorage', error);
      return error;
    }
  })();
};

/**
 * 카테고리 정보 - 탭
 */
let categories = { captions: [], codes: [] };
export const setCategories = (v: any) => (categories = v);
export const getCategories = () => categories;

/**
 * 카테고리 정보 - 홈
 */
let cmnItemVOList = {};
export const setCmnItemVOList = (v: any) => (cmnItemVOList = v);
export const getCmnItemVOList = () => cmnItemVOList;

export const setOptions = (options?: object) => {
  (async () => {
    try {
      if (options) {
        await AsyncStorage.setItem(
          'options',
          JSON.stringify(
            options || {
              autoLogin: false,
              saveId: false,
            },
          ),
        );
      }
    } catch (error) {
      console.debug('setOptions', error);
      return error;
    }
  })();
};

export const getOptions = () => {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem('options', (error, options) => {
        if (!error) {
          if (options) {
            resolve(JSON.parse(options));
            console.debug('JSON.parse(options):::::', JSON.parse(options));
          } else {
            resolve({
              autoLogin: false,
              saveId: false,
            });
          }
        } else {
          console.debug('getOptions ::', error);
          reject(error);
        }
      });
    } catch (error) {
      reject(error);
      console.debug('getOptions', error);
    }
  });
};

export const showImagePicker = (callback: any) => {
  const options = {
    title: '이미지를 선택해 주세요',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    takePhotoButtonTitle: '카메라',
    chooseFromLibraryButtonTitle: '사진선택',
    cancelButtonTitle: '취소',

    maxWidth: 1920,
    maxHeight: 1920,
    quality: 0.7,
  };

  ImagePicker.showImagePicker(options, (response: any) => {
    if (response.error) {
      callback(response.error, null);
    }
    if (response.uri) {
      //   const source = { uri: response.uri };
      callback(null, response);
    }
  });
};

export const shareUrlToSNS = async (url: string) => {
  console.log('shareUrlToSNS URL :: ', url);

  try {
    const result = await Share.share({
      url: url,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    console.debug('shareUrlToSNS ERROR :: ', error);
  }
};

export const AsyncAlert = (title: string, message: string, okText: string, noText: string) => {
  return new Promise((resolve, _) => {
    const buttonArray = [{ text: okText, onPress: () => resolve(true) }];
    noText && buttonArray.push({ text: noText, onPress: () => resolve(false) });
    Alert.alert(title, message, buttonArray, { cancelable: false });
  });
};

export const useInterval = (callback: any, delay: number) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export const getAppNameWithCode = (appCode: string) => {
  if (appCode) {
    switch (appCode.toLowerCase()) {
      case 'coupeats':
      case 'coupang':
        return '쿠팡이츠';
      case 'baemin':
        return '배달의민족';
      case 'yogiyo':
        return '요기요';
      default:
        break;
    }
  }
  return;
};

export const DELIVERY_APP_KEY = {
  쿠팡이츠: 'coupeats',
  배달의민족: 'baemin',
  요기요: 'yogiyo',
};

export const getImageSize = async (imageUri: string) => {
  return new Promise((resolve, reject) => {
    try {
      Image.getSize(imageUri, (width, height) => {
        console.log('width, height : ', width, height);
        resolve({ width, height });
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getRandomValue = (minValue: number = 0, maxValue: number = 15) => {
  return Math.floor(Math.random() * (maxValue + 1) + minValue);
};
