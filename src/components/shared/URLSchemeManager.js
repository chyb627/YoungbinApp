import { Linking } from 'react-native';

export const getUrlMethod = (urlParams) => {
  let _url = urlParams.replace('thepaywallet://', '');
  return _url.split('?')[0];
};

export const getUrlParams = (urlParams) => {
  let params = {};
  urlParams.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
    params[key] = decodeURIComponent(value);
  });
  return params;
};

const handleOpenURL = async (url) => {
  if (url) {
    let urlParams = url;
    if (url.url) {
      urlParams = url.url;
    }
    // console.log('handleOpenURL :: ', urlParams);

    let method = getUrlMethod(urlParams);
    let params = getUrlParams(urlParams);

    console.log('handleOpenURL method :: ', method);
    console.log('handleOpenURL params :: ', params);
  }
};

let initalUrl = null;
export const setInitalUrl = (v) => (initalUrl = v);
export const getInitalUrl = () => initalUrl;
export const removeInitalUrl = () => (initalUrl = null);

export const registerOpenUrlListener = () => {
  Linking.getInitialURL()
    .then((url) => {
      // console.log('getInitialURL :: url :: ', url);
      setInitalUrl(url);

      if (url) {
        handleOpenURL(url);
      }
    })
    .catch((err) => console.log('An error occurred', err));
  Linking.addEventListener('url', handleOpenURL);
};
