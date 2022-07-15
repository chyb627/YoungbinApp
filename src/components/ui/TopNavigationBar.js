import React, {useState, useEffect, useContext} from 'react';
import {Text, View, SafeAreaView, Pressable} from 'react-native';
import SvgBlackArrow from '~assets/svg/ico-nav-black-arr.svg';
import SvgClose from '~assets/svg/close.svg';
import {getColor} from '~shared/Common';
import {
  getTitleWithComponentName,
  dismissModal,
  popComponent,
  dismissOverlayWithAnimation,
  popToRoot,
} from '~shared/RNN';
import RNBPressable from '~ui/RNBPressable';

export default function TopNavigationBar(props) {
  /**
   * props
   * title : 상단 표시 타이틀
   * isModal :
   * isPopup : 팝업인지 아닌지
   * rightButton : rightButton 이미지 경로
   */
  const title = props.title || getTitleWithComponentName();
  const isNeedPopToRoot = props.isNeedPopToRoot;
  const hasBack = props.hasBack === undefined ? true : props.hasBack;
  const hasClose = props.hasClose === undefined ? true : props.hasClose;
  const isPopup = props.isPopup;
  const isModal = props.isModal;
  const hasBackground = props.hasBackground || false;
  const isWhiteBackground = props.hasBackground || true;
  const visibleSettingButton =
    props.visibleSettingButton === undefined
      ? true
      : props.visibleSettingButton;
  const rightButtons =
    props.rightButtons === undefined ? false : props.rightButtons;
  const leftButtons =
    props.leftButtons === undefined ? false : props.leftButtons;

  const textColor = hasBackground ? 'text-white' : 'text-black';
  const backgroundColor = isWhiteBackground ? 'bg-white' : 'bg-primary';
  const borderStyle = isWhiteBackground ? 'border-b border-wr-gray-200 ' : '';
  const leftButtonColor = hasBackground ? 'white' : 'black';
  const hasBorder = props.hasBorder === undefined ? true : false;

  return (
    <View
      style={{...tw(`${backgroundColor} border-wr-gray-200`), ...props.style}}>
      <SafeAreaView className="">
        <View
          style={tw(
            `flex flex-row h-16 items-center justify-center px-4 ${
              hasBorder ? borderStyle : ''
            }`,
          )}>
          <Text
            style={tw(
              `w-full text-center text-xl font-medium ${textColor} px-8`,
            )}
            numberOfLines={1}>
            {title}
          </Text>
          {props.children && (
            <View className="absolute w-full justify-center">
              {props.children}
            </View>
          )}
          <View className="absolute flex flex-row h-16 items-center w-full">
            {hasClose && (isPopup || isModal) && (
              <View className="w-full items-end absolute">
                <RNBPressable
                  className="w-12 items-end pr-2"
                  onPress={() => {
                    isPopup &&
                      dismissOverlayWithAnimation(props.animatedValue, true);
                    isModal && dismissModal(props.componentId);
                  }}>
                  <SvgClose
                    width={19}
                    height={19}
                    fill={getColor(leftButtonColor)}
                  />
                </RNBPressable>
              </View>
            )}
            {hasBack && (
              <RNBPressable
                className="w-12 h-full justify-center"
                onPress={() => {
                  if (isNeedPopToRoot) {
                    popToRoot(props.componentId);
                  } else {
                    popComponent(props.componentId);
                  }
                  // if (isModal) {
                  //   dismissModal(props.componentId);
                  // } else {
                  //   if (isNeedPopToRoot) {
                  //     popToRoot(props.componentId);
                  //   } else {
                  //     popComponent(props.componentId);
                  //   }
                  // }
                }}>
                <SvgBlackArrow
                  width={19}
                  height={19}
                  fill={getColor(leftButtonColor)}
                  color={getColor(leftButtonColor)}
                  stroke={getColor(leftButtonColor)}
                />
              </RNBPressable>
            )}
            {rightButtons && !isModal ? (
              <View className="flex-1 items-end justify-center">
                <View className="flex-row">
                  {rightButtons
                    ? rightButtons.map((value, index) => {
                        return (
                          <View key={`rightButton-${index}`}>{value}</View>
                        );
                      })
                    : null}
                </View>
              </View>
            ) : null}
            {leftButtons && !isModal ? (
              <View className="flex-1 items-start justify-center">
                <View className="flex-row">
                  {leftButtons
                    ? leftButtons.map((value, index) => {
                        return <View key={`leftButton-${index}`}>{value}</View>;
                      })
                    : null}
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
