// import {LogBox} from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications
import React, { useState, useEffect } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  modifyIsFirst,
  modifyNetInfo,
  setUser,
} from './src/redux/reducers/UserReducer';
import Auth from './src/Services';
import SplashScreen from './SplashScreen';
import NetInfo from '@react-native-community/netinfo';
import { COLORS } from './src/constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AppStack, AuthStack } from './src/navigation';
import Onboarding from './src/screens/Onboarding';
// import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
const Stack = createStackNavigator();
import 'moment/locale/ar';

const ObBoardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}
      initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};
const App = () => {
  const dispatch = useDispatch();
  const { login, first } = useSelector(state => state.UserReducer);

  const [loginChk, setloginChk] = useState(true);
  useEffect(() => {
    getUser();
    NetInfo.addEventListener(state => {
      dispatch(modifyNetInfo(state.isInternetReachable));
    });
  }, []);

  const getUser = async () => {
    let data = await Auth.getAccount();
    let isFirst = await Auth.getFirst();

    if (isFirst != '1') {
      dispatch(modifyIsFirst(true));
    }
    if (data != null) {
      dispatch(setUser(data));
    }

    setTimeout(() => {
      setloginChk(false);
    }, 3100);
  };

  // if (loginChk) {
  //   return <SplashScreen />;
  // }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <NavigationContainer>
        {
          first ? <ObBoardStack /> :
            login ? <AppStack />
              : <AuthStack />
        }
      </NavigationContainer>
      <Toast />
    </SafeAreaView>
  );
};

export default App;
