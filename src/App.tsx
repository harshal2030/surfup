import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import * as Splash from 'expo-splash-screen';

import {initTable} from './db';
import {RootStackParamList} from './navigators';

const Stack = createStackNavigator<RootStackParamList>();

class App extends React.Component {
  componentDidMount() {
    this.initApp();
  }

  initApp = async () => {
    try {
      await Splash.preventAutoHideAsync();
      initTable();
      await Splash.hideAsync();
    } catch (e) {
      // move one
    }
  };

  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="Home"
          component={require('./screens/Home').default}
        />
        <Stack.Screen
          name="Items"
          component={require('./screens/Items').default}
        />
        <Stack.Screen
          name="Groups"
          component={require('./screens/Groups').default}
        />
      </Stack.Navigator>
    );
  }
}

export default App;
