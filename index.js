/**
 * @format
 */
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './src/global';
import {NavigationContainer} from '@react-navigation/native';

const Wrapper = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => Wrapper);
