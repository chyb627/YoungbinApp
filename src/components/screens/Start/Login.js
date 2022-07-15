import React, {useState} from 'react';
import {Text, View, Alert, Image} from 'react-native';
import {observer} from 'mobx-react-lite';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {pushComponent, setRootBottomTabs} from '~shared/RNN';
import RNBPressable from '~ui/RNBPressable';
import TextInput from '~ui/CustomTextInput';

const Login = observer(props => {
  const push = componentName => {
    const pushParams = {
      id: props.componentId,
      name: componentName,
    };
    pushComponent(pushParams);
  };

  // 로그인 입력 확인
  const [loginCheck, loginCheckSet] = useState('');

  // 패스워드 입력 확인
  const [pwCheck, pwCheckSet] = useState('');

  return (
    <View className="flex flex-1 items-center justify-center bg-white mt-5">
      <KeyboardAwareScrollView className="flex h-full w-full px-5 bg-white rounded-lg">
        <View className="justify-center py-16">
          <View className="h-22 my-1">
            <Text className="text-5xl font-bold text-black pb-1">영빈 앱</Text>
            <Text className="text-5xl font-bold text-black">
              시작해 보세요.
            </Text>
          </View>

          <View className="h-6 w-full">
            <Text className="text-base text-black font-normal">
              영빈앱에서 다양한 거래를 만나보세요
            </Text>
          </View>
        </View>
        <View className="justify-center py-6">
          <View className="">
            <View>
              <TextInput
                icon={require('~assets/images/ico-id.png')}
                keyboardType="email-address"
                borderSquare
                className="h-14 my-1 rounded-lg bg-white pl-12"
                placeholder="아이디를 입력해 주세요"
                onChangeText={text => {
                  loginCheckSet(text);
                }}
              />
              <TextInput
                icon={require('~assets/images/ico-pw.png')}
                borderSquare
                className="h-14 my-1 rounded-lg bg-white pl-12"
                placeholder="비밀번호 입력해주세요"
                secureTextEntry={true}
                onChangeText={text => {
                  pwCheckSet(text);
                }}
              />
            </View>
            {(loginCheck && pwCheck) !== '' ? (
              <RNBPressable
                onPress={() => {
                  setRootBottomTabs();
                }}
                className="justify-center items-center h-14 rounded-lg bg-primary my-1">
                <Text className="text-lg text-white font-medium">로그인</Text>
              </RNBPressable>
            ) : (
              <RNBPressable className="justify-center items-center h-14 rounded-lg bg-ag-gray-300 my-1">
                <Text className="text-lg text-white font-medium">로그인</Text>
              </RNBPressable>
            )}
            <View className="flex flex-row pt-3 ml-3 justify-center items-center">
              <RNBPressable
                className="h-10 px-2 bg-white items-center justify-center mx-1"
                onPress={() => {
                  //   await requestChangeDisplayOrder();
                  push('UseTerms');
                  // push('SignUp');
                }}>
                <Text className="text-ag-gray-800 font-normal">회원가입</Text>
              </RNBPressable>
              <View className="bg-ag-gray-200 h-3" style={{width: 1}} />
              <RNBPressable
                className="h-10 px-2 bg-white items-center justify-center mx-1"
                onPress={async () => {
                  //   await requestChangeDisplayOrder();
                  Alert.alert('아이디찾기');
                }}>
                <Text className="text-ag-gray-800 font-normal">아이디찾기</Text>
              </RNBPressable>
              <View className="bg-ag-gray-200 h-3" style={{width: 1}} />
              <RNBPressable
                className="h-10 px-2 bg-white items-center justify-center mx-1"
                onPress={async () => {
                  //   await requestChangeDisplayOrder();
                  Alert.alert('비밀번호 재설정');
                }}>
                <Text className="text-ag-gray-800 font-normal">
                  비밀번호 재설정
                </Text>
              </RNBPressable>
            </View>
          </View>
        </View>
        <View className="flex-1 justify-center">
          <View className="items-center px-4">
            <RNBPressable className="justify-center h-12 w-full rounded-lg bg-yellow-400 my-1">
              <View className="flex-row items-center justify-center">
                <View className="w-full absolute justify-center">
                  <Image
                    className="h-5 w-5 ml-6"
                    source={require('~assets/images/logo-kakao.png')}
                  />
                </View>
                <Text
                  onPress={async () => {
                    // console.log('메인');
                    await setRootBottomTabs();
                  }}
                  className="text-base text-black font-medium">
                  카카오톡 로그인
                </Text>
              </View>
            </RNBPressable>
            <RNBPressable className="justify-center h-12 w-full rounded-lg bg-green-500 my-1">
              <View className="flex-row items-center justify-center">
                <View className="w-full absolute justify-center">
                  <Image
                    className="h-5 w-5 ml-6"
                    source={require('~assets/images/logo-naver.png')}
                  />
                </View>
                <Text
                  onPress={async () => {
                    // console.log('메인');
                    await setRootBottomTabs();
                  }}
                  className="text-base text-white font-medium">
                  네이버 로그인
                </Text>
              </View>
            </RNBPressable>
            <RNBPressable className="justify-center h-12 w-full rounded-lg bg-white border border-gray-400 mt-1 mb-5">
              <View className="flex-row items-center justify-center">
                <View className="w-full absolute justify-center">
                  <Image
                    className="h-5 w-5 ml-6"
                    source={require('~assets/images/logo-google.png')}
                  />
                </View>
                <Text
                  onPress={async () => {
                    // console.log('메인');
                    await setRootBottomTabs();
                  }}
                  className="text-base text-black font-medium">
                  구글 로그인
                </Text>
              </View>
            </RNBPressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
});

export default Login;
