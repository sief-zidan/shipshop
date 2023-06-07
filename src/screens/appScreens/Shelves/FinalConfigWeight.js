// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   Modal,
//   Vibration,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import {COLORS, FONTS, icons, lotties, SIZES} from '../../../constants';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import {RNCamera} from 'react-native-camera';
// import {RFValue} from 'react-native-responsive-fontsize';
// import {FormInput, Header, IconButton} from '../../../components';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import utils from '../../../utils';
// import {Button} from 'react-native-paper';
// import {POST} from '../../../Helpers/ApiHelper';
// import AnimatedLottieView from 'lottie-react-native';
// const FinalConfigWeight = ({navigation, route}) => {
//   const {label} = route.params;
//   const [reqLoaing, setReqLoading] = useState(false);
//   const [shelfWeight, setShelfWeight] = useState('');

//   useEffect(() => {
//     let interv = setInterval(function () {
//       setShelfWeight(Math.floor(Math.random() * (14 - 12 + 1) + 12) + '');
//     }, 1000);

//     setTimeout(() => {
//       clearInterval(interv);
//     }, 1000 * 7);
//   }, []);

//   const finalConfirm = () => {
//     setReqLoading(true);
//     setTimeout(() => {
//       utils.toastAlert('success', 'Shelf Added Successfully');
//       navigation.navigate('Shelves');
//       setReqLoading(false);
//     }, 1500);
//   };

// function renderHeader() {
//   return (
//     <Header
//       title={label}
//       containerStyle={{
//         height: 50,
//         marginHorizontal: SIZES.padding,
//         marginTop: 25,
//       }}
//       leftComponent={
// <IconButton
//   icon={icons.back}
//   containerStyle={{
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderRadius: SIZES.radius,
//     borderColor: COLORS.gray2,
//   }}
//   iconStyle={{
//     width: 20,
//     height: 20,
//     tintColor: COLORS.gray2,
//   }}
//   onPress={() => navigation.goBack()}
// />
//       }
//       rightComponent={<View style={{width: 40}} />}
//     />
//   );
// }

//   function renderBody() {
//     return (
//       <View
//         style={{
// marginTop: SIZES.radius,
// paddingHorizontal: SIZES.padding,
// paddingBottom: SIZES.padding * 2,
//         }}>
//         <View
//           style={{
//             width: '90%',
//             alignSelf: 'center',
//             minHeight: RFValue(200),
//             ...COLORS.shadow,
//             backgroundColor: COLORS.gray3,
//             borderRadius: RFValue(40),
//             marginTop: RFValue(20),
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <View
//             style={{
//               ...COLORS.shadow,
//               backgroundColor: COLORS.white,
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: RFValue(80),
//               height: RFValue(80),
//               borderRadius: RFValue(80 / 2),
//               position: 'absolute',
//               alignSelf: 'center',
//               top: RFValue(-20),
//             }}>
//             <AnimatedLottieView
//               source={lotties.measure_machine}
//               style={{
//                 width: RFValue(120),
//                 height: RFValue(120),
//               }}
//               resizeMode="contain"
//               loop
//               autoPlay
//             />
//           </View>
//           <Text style={{...FONTS.h3, color: COLORS.black}}>
//             Weight: {shelfWeight} kg
//           </Text>
//         </View>
//         <Button
//           loading={reqLoaing}
//           disabled={reqLoaing}
//           onPress={finalConfirm}
//           mode="contained"
//           labelStyle={{
//             ...FONTS.h3,
//             color: COLORS.white,
//           }}
//           buttonColor={COLORS.secondary}
//           style={{
//             borderRadius: SIZES.base,
//             marginTop: RFValue(40),
//           }}>
//           Config
//         </Button>
//       </View>
//     );
//   }
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: COLORS.white,
//       }}>
//       {renderHeader()}
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {renderBody()}
//       </ScrollView>
//     </View>
//   );
// };

// export default FinalConfigWeight;

import {View, Text} from 'react-native';
import React from 'react';

const FinalConfigWeight = () => {
  return (
    <View>
      <Text>FinalConfigWeight</Text>
    </View>
  );
};

export default FinalConfigWeight;
