import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { MainScreen } from './src/screens/MainScreen';
import { CreateScreen } from './src/screens/CreateScreen';
import { EditScreen } from './src/screens/EditScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { allReducers } from './src/redux';

const MainStack = createStackNavigator();

const MainNav = () => {
  return (
    <MainStack.Navigator
      initialRouteName='Main'
    >
      <MainStack.Screen
        component={MainScreen}
        name='Main'
        options={{
          title: 'Задачи'
        }}
      />
      <MainStack.Screen
        component={LoginScreen}
        name='Login'
        options={{
          title: 'Вход'
        }}
      />
      <MainStack.Screen
        component={CreateScreen}
        name='Create'
        options={{
          title: 'Создать задачу'
        }}
      />
      <MainStack.Screen
        component={EditScreen}
        name='Edit'
        options={{
          title: 'Изменить задачу'
        }}
      />
    </MainStack.Navigator>
  )
}

const store = createStore(allReducers)

const App = () => {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <MainNav/>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
