import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';

export default function RNBPressable(props) {
  const [isMounted, isMountedSet] = useState(false);
  const [disabled, disabledSet] = useState(props.disabled || false);
  const [timeout, timeoutSet] = useState(null);

  useEffect(() => {
    isMountedSet(true);

    return () => {
      isMountedSet(false);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeout]);

  const handleButtonClicked = () => {
    disabledSet(true);
    props.onPress && props.onPress();
    timeoutSet(
      setTimeout(() => {
        if (isMounted) {
          disabledSet(false);
        }
      }, 500),
    );
  };

  return <Pressable {...props} disabled={disabled} onPress={handleButtonClicked} />;
}
