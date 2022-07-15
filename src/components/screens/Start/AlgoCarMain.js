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

const AlgoCarMain = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <View className="bg-primary">
          <Text className="text-4xl">AlgoCarMain</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlgoCarMain;
