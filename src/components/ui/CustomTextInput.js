import React, { useState, useEffect } from 'react';
import { TextInput, Keyboard } from 'react-native';
import { getColor } from '~shared/Common';

export default function CustomTextInput(props) {
  const borderSquare = props.borderSquare;
  const [borderColor, borderColorSet] = useState(getColor(props.borderColor || 'wr-gray-200'));

  useEffect(() => {
    return () => {};
  });

  // console.log(borderSquare, borderColor);
  // textContentType={'oneTimeCode'}
  const style = !borderSquare
    ? { ...props.style, borderColor: 'transparent', borderBottomColor: borderColor }
    : {
        ...props.style,
        borderWidth: 1,
        borderColor: borderColor,
        borderTopColor: borderColor,
        borderBottomColor: borderColor,
        borderLeftColor: borderColor,
        borderRightColor: borderColor,
      };
  return (
    <TextInput
      {...props}
      ref={props.customRef && props.customRef}
      style={{ ...style }}
      // className="text-sm h-12"
      autoCorrect={false}
      autoCapitalize="none"
      onFocus={() => {
        props.isVisibleInputSet && props.isVisibleInputSet(true);
        borderColorSet(getColor('primary'));
      }}
      onBlur={() => {
        props.isVisibleInputSet && props.isVisibleInputSet(false);
        borderColorSet(getColor('wr-gray-200'));
      }}
      placeholderTextColor={getColor('wr-gray-400')}
      blurOnSubmit={false}
      onSubmitEditing={() => {
        if (props.multiline === false) {
          props.onSubmitEditing && props.onSubmitEditing();
          Keyboard.dismiss();
        }
      }}
      textContentType={props.secureTextEntry ? 'oneTimeCode' : null}
    />
  );
}
