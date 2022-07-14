import React, {useState} from 'react';
import {Text, View, SafeAreaView, Alert, Image} from 'react-native';
import {observer} from 'mobx-react-lite';
import RNBPressable from '~ui/RNBPressable';
import {pushComponent} from '~shared/RNN';
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
    <View className="flex flex-1 items-center justify-center bg-white">
      <SafeAreaView className="flex w-8/10 bg-white rounded-lg">
        <View className="h-22 w-48 mb-3">
          <Text className="text-5xl font-bold text-black pb-1">영빈앱, </Text>
          <Text className="text-5xl font-bold text-black">시작해 보세요.</Text>
        </View>

        <View className="h-6 w-64 mb-12">
          <Text className="text-base text-black font-normal">
            영빈앱을 만나보세요
          </Text>
        </View>
        <View className="mb-6">
          <View>
            <TextInput
              borderSquare
              borderColor={'wr-gray-400'}
              className="h-12 my-1 rounded bg-white pl-2"
              placeholder="아이디를 입력해 주세요"
              onChangeText={text => {
                loginCheckSet(text);
              }}
            />
            <TextInput
              borderSquare
              borderColor={'wr-gray-400'}
              className="h-12 my-1 border border-wr-gray-200 rounded bg-white pl-2"
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
                push('UseTerms');
              }}
              className="justify-center items-center h-14 rounded bg-blue-600 my-1">
              <Text className="text-lg text-white font-medium">로그인</Text>
            </RNBPressable>
          ) : (
            <RNBPressable className="justify-center items-center h-14 rounded bg-gray-400 my-1">
              <Text className="text-lg text-white font-medium">로그인</Text>
            </RNBPressable>
          )}
          <View className="flex flex-row pt-3 ml-3">
            <RNBPressable
              className="h-10 px-2 bg-white items-center justify-center mx-1"
              onPress={() => {
                //   await requestChangeDisplayOrder();
                // Alert.alert('회원가입');
                push('SignUp');
              }}>
              <Text className="text-black font-normal">회원가입</Text>
            </RNBPressable>
            <RNBPressable
              className="h-10 px-2 bg-white items-center justify-center mx-1"
              onPress={async () => {
                //   await requestChangeDisplayOrder();
                Alert.alert('아이디찾기');
              }}>
              <Text className="text-black font-normal">아이디찾기</Text>
            </RNBPressable>
            <RNBPressable
              className="h-10 px-2 bg-white items-center justify-center mx-1"
              onPress={async () => {
                //   await requestChangeDisplayOrder();
                Alert.alert('비밀번호 재설정');
              }}>
              <Text className="text-black font-normal">비밀번호 재설정</Text>
            </RNBPressable>
          </View>
        </View>
        <View className="items-center">
          <RNBPressable className="justify-center h-12 w-72 rounded-lg bg-yellow-400 my-1">
            <View className="flex-row items-center">
              <Image
                className="h-5 w-5 mr-16 ml-6 mt-1"
                source={require('~assets/images/logo-kakao.png')}
              />
              <Text className="text-base text-black font-normal">
                카카오톡 로그인
              </Text>
            </View>
          </RNBPressable>
          <RNBPressable className="justify-center h-12 w-72 rounded-lg bg-green-500 my-1">
            <View className="flex-row items-center">
              <Image
                className="h-5 w-5 mr-16 ml-6 mt-1"
                source={require('~assets/images/logo-naver.png')}
              />
              <Text className="text-base text-white font-normal ml-2">
                네이버 로그인
              </Text>
            </View>
          </RNBPressable>
          <RNBPressable className="justify-center h-12 w-72 rounded-lg bg-white border border-gray-400 my-1">
            <View className="flex-row items-center">
              <Image
                className="h-5 w-5 mr-16 ml-6 mt-1"
                source={require('~assets/images/logo-google.png')}
              />
              <Text className="text-base text-black font-normal ml-2">
                구글 로그인
              </Text>
            </View>
          </RNBPressable>
        </View>
      </SafeAreaView>
    </View>
  );
});

export default Login;
