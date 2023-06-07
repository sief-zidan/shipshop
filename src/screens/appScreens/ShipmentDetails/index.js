import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Modal, Linking, StatusBar
} from 'react-native';
import {
  COLORS,
  FONTS,
  SIZES,
  images,
  icons,
  dummyData,
} from '../../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageViewer from 'react-native-image-zoom-viewer';
import { PaperProvider, Menu } from 'react-native-paper';

import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import ShipmentItem from './ShipmentItem';
const ShipmentDetails = ({ navigation, route }) => {
  const [shipData, setShipData] = useState({});
  //   Menu

  const [visibleMenu, setVisibleMenu] = useState(false);
  const [loading, setloading] = useState(false);

  // Image Slide
  const [visibleImageSlider, setVisibleImageSlider] = useState(false);
  const [imageSliderData, setImageSliderData] = useState([]);
  const [imageSliderindex, setImageSliderindex] = useState(0);

  useEffect(() => {
    setloading(true)
    let x = route.params.ship
    setShipData(x);
    setTimeout(() => {
      setloading(false)

    }, 1500);
    // console.log(x)
  }, []);

  function getUserName() {
    let name =
      shipData?.userData?.user_name?.split(' ')[0] +
      ' ' +
      shipData?.userData?.user_name?.split(' ')[1].charAt(0);
    return name || '';
  }

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            width: RFValue(40),
            alignItems: 'flex-start',

            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <Ionicons name="arrow-back" size={RFValue(24)} color={COLORS.white} />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            ...FONTS.h3,
            color: COLORS.white,
            textAlign: 'left'
          }}>
          {shipData?.shipment_name}
        </Text>


      </View >
    );
  }

  function renderBody() {
    return (
      <View>
        {/* Main info */}
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingBottom: RFValue(5),
          }}>
          <View
            style={{
              paddingHorizontal: SIZES.radius,
            }}>
            {/* countries */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...FONTS.h2,
                  fontWeight: 'bold',
                  color: COLORS.dark60,
                }}>
                {shipData?.from_country}
              </Text>
              <Text
                style={{
                  ...FONTS.h2,
                  fontWeight: 'bold',
                  color: COLORS.dark60,
                }}>
                {shipData?.to_country}
              </Text>
            </View>
            {/* logo */}

            <Ionicons
              name="airplane"
              color={COLORS.primary}
              size={RFValue(25)}
              style={{
                alignSelf: 'center',
              }}
            />

            {/* countries codes */}

            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.dark60,
                }}>
                {shipData?.from_code}
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.dark60,
                }}>
                {shipData?.to_code}
              </Text>
            </View> */}
          </View>
          {/* Devior */}
          <View
            style={{
              height: 2,
              backgroundColor: COLORS.gray2,
              marginHorizontal: SIZES.radius,
              marginVertical: RFValue(10),
            }}
          />
          <View
            style={{
              paddingHorizontal: SIZES.radius,
            }}>
            {/* Expected Date */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons
                name="ios-calendar"
                color={COLORS.primary}
                size={RFValue(24)}
              />
              <Text style={{ ...FONTS.h3, color: COLORS.gray2 }}>
                {'  '}Expected by{' '}
                <Text style={{ fontWeight: 'bold', color: COLORS.darkGray }}>
                  {moment(shipData?.before_date).locale('en').format('dddd, D MMM YYYY')}
                </Text>
              </Text>
            </View>
            {/* Meet Type */}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="van-utility"
                color={COLORS.primary}
                size={RFValue(24)}
              />

              <Text style={{ ...FONTS.h3, color: COLORS.gray2 }}>
                {'  '}
                {'meet in person or courier'}
              </Text>
            </View>
            {/* {shipData?.shipment_description && (
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.darkGray,
                }}>
                {shipData?.shipment_description}
              </Text>
            )} */}
          </View>
        </View>
        {/* Person Info */}
        <View
          style={{
            padding: SIZES.radius,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.gray,
            }}>
            Posted by{' '}
            <Text
              style={{
                fontWeight: 'bold',
                color: COLORS.primary,
              }}>
              {getUserName()}.
            </Text>
          </Text>

        </View>

        <View
          style={{
            marginTop: -15,
            paddingLeft: SIZES.radius,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://wa.me/+2' + shipData?.userData?.phone)
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.gray,
              }}>
              WhatsApp{' '}

              <Text
                style={{
                  fontWeight: 'bold',
                  color: COLORS.primary,
                }}>
                {shipData?.userData?.phone}.
              </Text>



            </Text>
          </TouchableOpacity>
        </View>


        <FlatList
          data={shipData?.items_arr}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => `shipItem-${index}`}
          contentContainerStyle={{
            // marginTop: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            paddingBottom: SIZES.padding,
            flexGrow: 1,
          }}
          renderItem={({ item, index }) => {
            return (
              <ShipmentItem
                item={item}
                index={index}
                onPressImage={psIndex => {
                  let sliderData = item.item_images.map(inner => {
                    return { url: inner };
                  });
                  setImageSliderData(sliderData);
                  setImageSliderindex(psIndex);
                  setVisibleImageSlider(true);
                }}
                lenItems={
                  shipData?.items_arr?.length > 1 &&
                  `${shipData?.items_arr?.length} Total Items`
                }
              />
            );
          }}
        />
      </View>
    );
  }


  return (
    <>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={COLORS.dark60}
        />
        {renderHeader()}

        {loading ? (


          <>
            <View style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }} >
              <LottieView
                source={icons.loading}
                autoPlay
                loop
                style={{ height: 180, width: '100%' }}
                resizeMode="contain"
              />
              <Text style={{ fontFamily: FONTS.fontFamily, fontSize: 16, color: '#000' }} >
                Loading ...
              </Text>
            </View>

          </>
        ) :
          <>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                // marginTop: SIZES.radius,
                // paddingHorizontal: SIZES.padding,
                paddingBottom: SIZES.radius,
              }}>
              {renderBody()}
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: SIZES.radius,
              }}>
              <View>
                <Text style={{ ...FONTS.h3 }}>Traveler Reward</Text>
                <Text style={{ ...FONTS.h3, fontWeight: 'bold' }}>
                  ${" "}{shipData?.traveler_reward}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: 100,
                  padding: SIZES.radius,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <Text style={{ ...FONTS.h4, fontWeight: 'bold' }}>SEND REQUEST</Text>
              </TouchableOpacity>
            </View>
          </>
        }


      </View>
      <Modal
        visible={visibleImageSlider}
        onRequestClose={() => {
          setVisibleImageSlider(false);
          setImageSliderData([]);
          setImageSliderindex(0);
        }}
        transparent={true}>
        <ImageViewer
          imageUrls={imageSliderData}
          index={imageSliderindex}
          enableSwipeDown={true}
          useNativeDriver
          onSwipeDown={() => {
            setVisibleImageSlider(false);
            setImageSliderData([]);
            setImageSliderindex(0);
          }}
          onCancel={() => {
            setVisibleImageSlider(false);
            setImageSliderData([]);
            setImageSliderindex(0);
          }}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light60,
  },
  headerContainer: {
    backgroundColor: COLORS.dark60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.radius,
  },
});

export default ShipmentDetails;





// const ShipmentDetails = () => {
//   const [shipData, setShipData] = useState({

//   });

//   const [visibleMenu, setVisibleMenu] = useState(false);
//   // Image Slide
//   const [visibleImageSlider, setVisibleImageSlider] = useState(false);
//   const [imageSliderData, setImageSliderData] = useState([]);
//   const [imageSliderindex, setImageSliderindex] = useState(0);

//   useEffect(() => {
//     // setShipData(dummyData.shipmentData1);
//   }, []);

//   function getUserName() {
//     let name =
//       shipData?.posted_by?.user_name?.split(' ')[0] +
//       ' ' +
//       shipData?.posted_by?.user_name?.split(' ')[1].charAt(0);
//     return name || '';
//   }

//   return (
//     <View>
//       <Text>aaaaaaa</Text>
//     </View>
//   )
// }

// export default ShipmentDetails