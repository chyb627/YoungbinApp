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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const RegisterForSale = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <View className="bg-primary">
          <Text className="text-4xl">RegisterForSale</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterForSale;
