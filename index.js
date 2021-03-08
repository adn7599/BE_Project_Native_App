/**
 * @format
 */

import {AppRegistry} from 'react-native';
// Original import App statement
// import App from './src/App';

// Testing import App statement
import App from './src/Screens/LoginForm';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
