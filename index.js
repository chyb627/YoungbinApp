import '~styles/GlobalStyle';
import 'babel-plugin-tailwind-rn/dist/useTailwind';
import {AppStartRNN} from '~shared/RNN';
// import { registerFirebasePush } from '~shared/FirebaseManager';
import {registerOpenUrlListener} from '~shared/URLSchemeManager';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'VirtualizedLists should',
  'Calling bridge.imageLoader',
  'Animated component is no longer necessary.',
  'new NativeEventEmitter',
]);

AppStartRNN();

registerOpenUrlListener();
