import React from 'react';
import { Text, Pressable, Platform, TextInput } from 'react-native';
import _ from 'lodash';

/**
 * aos 는 weight 값으로 볼드를 줄 수 없다. fontFamily로만 조절가능.
 */
const propsStyleLoop = (props) => {
  if (props.style && props.style.length > 0 && true) {
    let flagStr = '';
    let newProps = _.cloneDeep(props);
    if (Platform.OS === 'android') {
      newProps.style = [];
      for (let i = 0; i < props.style.length; i++) {
        const element = _.cloneDeep(props.style[i]);
        if (Object.getOwnPropertyNames(element).length === 0) {
          continue;
        }
        if (element.fontFamily === 'NotoSansKR-Regular') {
          if (flagStr === '') {
            flagStr = 'Regular';
          }
          delete element.fontFamily;
        }
        if (element.fontWeight) {
          if (element.fontWeight === '900') {
            flagStr = 'Black';
          } else if (element.fontWeight === '700') {
            flagStr = 'Bold';
          } else if (element.fontWeight === '500') {
            flagStr = 'Medium';
          } else if (element.fontWeight === '300') {
            flagStr = 'Lignt';
          } else if (element.fontWeight === '200') {
            flagStr = 'Thin';
          }
          delete element.fontWeight;
        }
        if (element.fontSize) {
          element.lineHeight = element.fontSize + 4;
        }
        if (Object.getOwnPropertyNames(element).length > 0) {
          newProps.style.push(element);
        }
      }
    }
    if (newProps.style.length === 0 && flagStr !== '') {
      newProps.style.push({});
    }
    if (newProps.style.length > 0) {
      flagStr = flagStr || Platform.select({ ios: 'Light', android: 'Regular' });
      newProps.style[0].fontFamily = `NotoSansKR-${flagStr}`;
      // newProps.style[0].fontSize = 15.0;
    }
    props.style = _.cloneDeep(newProps.style);
    // console.log('nullvana end props', props);
  }
  return props;
};

const setCustomText = (customProps) => {
  Text.defaultProps = {
    ...Text.defaultProps,
    ...customProps,
  };
  const orgRender = Text.render;
  Text.render = function render(props, ref) {
    const style = Array.isArray(props.style) ? props.style : [props.style];
    props = {
      ...props,
      style: [Text.defaultProps.style, ...style],
    };
    props = propsStyleLoop(props);
    return orgRender.call(this, props, ref);
  };
};

const setCustomTextInput = (customProps) => {
  TextInput.defaultProps = {
    ...TextInput.defaultProps,
    ...customProps,
  };
  const orgRender = TextInput.render;
  TextInput.render = function render(props, ref) {
    const style = Array.isArray(props.style) ? props.style : [props.style];
    props = {
      ...props,
      style: [TextInput.defaultProps.style, ...style],
    };
    props = propsStyleLoop(props);
    return orgRender.call(this, props, ref);
  };
};

const customTextInputProps = {
  underlineColorAndroid: 'rgba(0,0,0,0)',
  style: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    fontFamily: 'NotoSansKR-Regular',
    lineHeight: 19, // rn bug https://github.com/facebook/react-native/issues/29232
  },
};
setCustomTextInput(customTextInputProps);

const customTextProps = {
  style: {
    fontFamily: 'NotoSansKR-Regular',
    letterSpacing: -0.82,
    fontSize: 15.0,
    ...Platform.select({
      android: {
        lineHeight: 19, // rn bug https://github.com/facebook/react-native/issues/29232
      },
    }),
  },
};
setCustomText(customTextProps);

Pressable.defaultProps = Pressable.defaultProps || {};
Pressable.defaultProps.android_ripple = { color: '#edf2f7' };

export const STYLE_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: -1, height: 5 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 5,
};
