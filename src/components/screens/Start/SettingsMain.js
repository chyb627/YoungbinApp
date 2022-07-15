import React from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';

import TopNavigationBar from '~ui/TopNavigationBar';

const SettingsMain = observer(props => {
  return (
    <View>
      <TopNavigationBar
        componentId={props.componentId}
        title="영빈앱"
        hasBack={false}
        hasClose={false}
      />
      <ScrollView>
        <View className="bg-primary">
          <Text className="text-4xl">SettingsMain</Text>
        </View>
      </ScrollView>
    </View>
  );
});

export default SettingsMain;
