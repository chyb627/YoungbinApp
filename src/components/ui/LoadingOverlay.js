import React from 'react';
import { View, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import LottieView from 'lottie-react-native';

import LoadingAnimation from '~assets/animations/57222-food-loading.json';

export default function LoadingOverlay(props) {
  return (
    <View className="w-full h-full absolute items-center justify-center">
      {/* <ActivityIndicator size="large" color={getColor('primary')} /> */}
      <View className="absolute w-full h-full bg-black opacity-25" />
      <LottieView
        className="h-16"
        source={LoadingAnimation}
        loop={true}
        resizeMode="contain"
        autoPlay
        onAnimationFinish={() => {
          console.log('Loading Animation end');
        }}
      />
    </View>
  );
}

export const LOADING_OVERLAY_ID = 'LoadingOverlay';
let isVisibleLoading = false;

export const setVisibleLoading = (flag) => {
  console.debug(`[ ] setVisibleLoading: ${flag}`);
  isVisibleLoading = flag;
};

export const showLoadingOverlay = async () => {
  console.debug(`[ ] showLoadingOverlay > isVisibleLoading ${isVisibleLoading}`);
  const DRAW_BEHIND = Platform.OS === 'android' && Platform.Version >= 30;
  const overlayOptions = {
    layout: {
      backgroundColor: 'transparent',
      componentBackgroundColor: 'transparent',
    },
    overlay: {
      interceptTouchOutside: true,
    },
  };
  if (DRAW_BEHIND) {
    // overlayOptions.statusBar.drawBehind = true;
  }

  if (!isVisibleLoading) {
    try {
      await Navigation.showOverlay({
        component: {
          id: LOADING_OVERLAY_ID,
          name: 'LoadingOverlay',
          options: overlayOptions,
        },
      });
    } catch (error) {
      console.debug(`error showLoadingOverlay ${JSON.stringify(error)}`);
    }
  }
};

export const dismissLoadingOverlay = async () => {
  console.debug(`[ ] dismissLoadingOverlay > isVisibleLoading ${isVisibleLoading}`);
  if (isVisibleLoading) {
    try {
      await Navigation.dismissOverlay(LOADING_OVERLAY_ID);
    } catch (error) {
      console.debug(`error dismissLoadingOverlay ${JSON.stringify(error)}`);
    }
  }
};
