import 'babel-plugin-tailwind-rn/dist/useTailwind';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
