import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const Login = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <View className="bg-primary">
          <Text className="text-4xl">Login</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
