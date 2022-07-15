import React, {useState} from 'react';
import {Text, View, SafeAreaView, Alert, Image} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {observer} from 'mobx-react-lite';
import RNBPressable from '~ui/RNBPressable';
import TopNavigationBar from '~ui/TopNavigationBar';
// import { pushComponent } from '~shared/RNN';
import IcoCarBig from '~assets/svg/ico-car-big.svg';

const YoungbinMain = observer(props => {
  return (
    <View>
      <TopNavigationBar
        // componentId={props.componentId}
        className="bg-wr-gray-100"
        title="영빈앱 메인"
        hasBack={false}
        hasClose={false}
        // goURL
      />
      <SafeAreaView className="h-full px-4">
        <View className="my-6">
          <Image
            className="h-36 w-full rounded-2xl"
            source={require('~assets/images/img_banner.jpg')}
          />
          <View className="absolute right-0 justify-center items-center mt-2 mr-7">
            <View className="bg-black opacity-25 h-5 w-12 rounded-2xl" />
            <Text className="text-white text-sm absolute">1/2</Text>
          </View>

          <View className="absolute pl-4">
            <Text className="text-2xl font-bold text-black mt-4">
              신차 장기렌트 연계
            </Text>
            <Text className="text-sm font-normal mt-1">
              특판차량 선구매로 저렴한 신차 장기렌트 이용
            </Text>
            <RNBPressable
              className="h-7 w-24 items-center justify-center rounded-3xl bg-primary mt-9"
              onPress={() => {
                Alert.alert('준비 중 입니다');
              }}>
              <Text className="text-sm text-white">자세히보기</Text>
            </RNBPressable>
          </View>
        </View>

        <RNBPressable
          className="h-42 mb-5 justify-center items-center rounded-2xl bg-white"
          onPress={() => {
            Navigation.mergeOptions(props.componentId, {
              bottomTabs: {
                currentTabIndex: 1,
              },
            });
          }}>
          <IcoCarBig className="mb-2" />
          <Text className="text-3xl font-bold text-black">차량구매</Text>
          <Text className="text-sm text-ag-gray-1000">
            알고카에서 확인한 실매물 LIST
          </Text>
        </RNBPressable>

        <RNBPressable
          className="h-42 mb-3 justify-center items-center rounded-2xl bg-white"
          onPress={() => {
            Navigation.mergeOptions(props.componentId, {
              bottomTabs: {
                currentTabIndex: 2,
              },
            });
          }}>
          <IcoCarBig className="mb-2" />
          <Text className="text-3xl font-bold text-black">내차팔기</Text>
          <Text className="text-sm text-ag-gray-1000">
            소비자와 직접 거래로 인한 유통비용 최소화
          </Text>
        </RNBPressable>
      </SafeAreaView>
    </View>
  );
});

export default YoungbinMain;
