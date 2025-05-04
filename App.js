import React from 'react';
import { View, Text } from 'react-native';
import DrawerNavigator from './routes';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <DrawerNavigator />
    </Provider>
  );
};

export default App;