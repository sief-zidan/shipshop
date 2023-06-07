import React from 'react';
import {TransitionPresets} from '@react-navigation/stack';
import BottomTab from './BottomTab';
// import {
//   NearbeStation,
//   StationDetails,
//   StationOption,

// } from '../screens/appScreens';
import MyShipments from '../screens/appScreens/Shipments/MyShipments';
import Mytrips from '../screens/appScreens/Shipments/Mytrips';

import { createStackNavigator } from '@react-navigation/stack';
import ShipmentDetails from '../screens/appScreens/ShipmentDetails';
const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}
      initialRouteName="MainStack"
    >

      <Stack.Screen name="MainStack" component={BottomTab} />
      <Stack.Screen name="MyShipments" component={MyShipments} />
      <Stack.Screen name="Mytrips" component={Mytrips} />
      <Stack.Screen name="ShipmentDetails" component={ShipmentDetails} />
      {/* <Stack.Screen
        name="StationOption"
        component={StationOption}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="StationDetails"
        component={StationDetails}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="NearbeStation"
        component={NearbeStation}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AppStack;
