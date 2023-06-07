import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {SharedElement} from 'react-navigation-shared-element';
import {IconButton, TextButton} from '../../../components';
import {COLORS, SIZES, FONTS, images, icons, lotties} from '../../../constants';
import * as Animatable from 'react-native-animatable';
import utils from '../../../utils';
import DatePicker from 'react-native-date-picker';
import {Shadow} from 'react-native-shadow-2';
import moment from 'moment';
import AnimatedLottieView from 'lottie-react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {Button} from 'react-native-paper';
const NearbeStation = ({navigation, route}) => {
  const mapViewRef = useRef();
  const {psItem} = route.params;
  const [isChoisePlace, setIsChoisePlace] = useState(false);
  const [reqLoading, setReqLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [openStartDate, setOpenStartDate] = useState(false);
  const [startDateValue, setStartDateValue] = useState('');
  const [openEndDate, setOpenEndDate] = useState(false);
  const [endDateValue, setEndDateValue] = useState('');
  const [userLocation, setUserLocation] = useState({});
  const [visableMapModal, setVisableMapModal] = useState(false);

  const [myOptions, setMyOptions] = useState([
    {
      id: 1,
      name: 'بنزين',
      icon: images.fuelPump,
    },
    {
      id: 2,
      name: 'ديزل',
      icon: images.solarPump,
    },
    {
      id: 3,
      name: 'غاز الطائرات النفاثة',
      icon: images.gasPump,
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestLocationPermision();
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);
  async function requestLocationPermision() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Need Location Permission',
        message: 'Need access to your location ',
      },
    );

    if (granted) {
      permissionHandle();
    }
  }
  const permissionHandle = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Need Location Permission',
        message: 'Need access to your location ',
      },
    );
    if (granted) {
      Geolocation.getCurrentPosition(
        // # here
        position => {
          let initialRegion = {
            latitude: 24.883038203025905,
            longitude: 46.86871224431639,
            // latitude: position.coords.latitude,
            // longitude: position.coords.longitude,
            latitudeDelta: 0.0002,
            longitudeDelta: 0.0002,
          };
          setUserLocation(initialRegion);
          if (visableMapModal) {
            mapViewRef.current.animateToRegion(initialRegion);
          }
        },
        error => {
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    }
  };
  function onRegionChange(newPoss) {
    let newResion = {
      latitude: newPoss.latitude,
      longitude: newPoss.longitude,
      latitudeDelta: 0.0002,
      longitudeDelta: 0.0002,
    };
    setUserLocation(newResion);
  }
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 25,
        }}>
        <IconButton
          icon={icons.back}
          containerStyle={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            transform: [{rotate: '180deg'}],
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: SIZES.radius,
            borderColor: COLORS.gray2,
          }}
          iconStyle={{
            width: 20,
            height: 20,
            tintColor: COLORS.gray2,
          }}
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            flex: 1,
          }}></View>

        <SharedElement id={`item.${psItem.id}.text`}>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.black,
            }}>
            {psItem.name}
          </Text>
        </SharedElement>
      </View>
    );
  }

  function renderBookAGas() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginBottom: RFValue(50),
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.black,
          }}>
          {selectedCard?.name}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
          }}>
          <Shadow>
            <TouchableOpacity
              onPress={() => {
                setOpenStartDate(true);
              }}
              style={{
                width: RFPercentage(20),
                height: RFValue(120),
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.light,
                alignItems: 'center',
                borderWidth: startDateValue ? 1.5 : null,
                borderColor: startDateValue ? COLORS.green : null,
              }}>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.dark,
                }}>
                {startDateValue != ''
                  ? moment(startDateValue).format('LLL')
                  : 'تاريخ بداية الحجز'}
              </Text>
              <AnimatedLottieView
                source={lotties.meeting}
                style={{
                  width: RFValue(70),
                  height: RFValue(70),
                }}
                autoPlay
                loop
              />
            </TouchableOpacity>
          </Shadow>
          <Shadow>
            <TouchableOpacity
              onPress={() => {
                setOpenEndDate(true);
              }}
              style={{
                width: RFPercentage(20),
                height: RFValue(120),
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.light,
                marginBottom: RFValue(15),
                alignItems: 'center',
                borderWidth: endDateValue ? 1.5 : null,
                borderColor: endDateValue ? COLORS.green : null,
              }}>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.dark,
                }}>
                {endDateValue != ''
                  ? moment(endDateValue).format('LLL')
                  : 'تاريخ نهاية الحجز'}
              </Text>
              <AnimatedLottieView
                source={lotties.meeting}
                style={{
                  width: RFValue(70),
                  height: RFValue(70),
                }}
                autoPlay
                loop
              />
            </TouchableOpacity>
          </Shadow>
          <Shadow>
            <TouchableOpacity
              onPress={() => {
                if (Object.keys(userLocation).length > 0) {
                  setVisableMapModal(true);
                } else {
                  permissionHandle();
                }
              }}
              style={{
                width: RFPercentage(20),
                height: RFValue(120),
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.light,
                alignItems: 'center',
                borderWidth: endDateValue ? 1.5 : null,
                borderColor: endDateValue ? COLORS.green : null,
              }}>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.dark,
                }}>
                تحديد العنوان
              </Text>
              <AnimatedLottieView
                source={lotties.pin_location}
                style={{
                  width: RFValue(90),
                  height: RFValue(90),
                }}
                autoPlay
                loop
              />
            </TouchableOpacity>
          </Shadow>
        </View>

        <DatePicker
          modal
          locale="ar"
          title="حدد تاريخ البداية"
          open={openStartDate}
          confirmText="تأكيد"
          cancelText="إلغاء"
          date={
            new Date(startDateValue) == 'Invalid Date'
              ? new Date()
              : new Date(startDateValue)
          }
          onConfirm={date => {
            setOpenStartDate(false);
            setStartDateValue(date);
          }}
          minimumDate={new Date()}
          onCancel={() => {
            setOpenStartDate(false);
          }}
        />

        <DatePicker
          modal
          locale="ar"
          title="حدد تاريخ الإنتهاء"
          theme="auto"
          confirmText="تأكيد"
          cancelText="إلغاء"
          open={openEndDate}
          date={
            new Date(endDateValue) == 'Invalid Date'
              ? new Date()
              : new Date(endDateValue)
          }
          onConfirm={date => {
            setOpenEndDate(false);
            setEndDateValue(date);
          }}
          minimumDate={new Date()}
          onCancel={() => {
            setOpenEndDate(false);
          }}
        />
      </View>
    );
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AnimatedLottieView
          source={lotties.man2}
          style={{
            width: RFValue(120),
            height: RFValue(120),
          }}
          autoPlay
          loop
        />
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.black,
          }}>
          جارى البحث عن اقرب منفذ لديك
        </Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        // paddingBottom: RFValue(60),
      }}>
      {renderHeader()}
      <View
        style={{
          flex: 1,
        }}>
        <MapView
          ref={mapViewRef}
          style={{
            flex: 1,
          }}
          // showsCompass={true}
          showsUserLocation={true}
          showsMyLocationButton={false}
          onRegionChangeComplete={newPoss => onRegionChange(newPoss)}
          provider={PROVIDER_GOOGLE}
          // removeClippedSubviews={true}
          initialRegion={userLocation}>
          <Marker
            coordinate={{
              latitude: 24.883038203025905,
              longitude: 46.86871224431639,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
              }}>
              <FastImage
                source={images.car}
                style={{
                  width: RFValue(40),
                  height: RFValue(40),
                }}
              />
            </View>
          </Marker>

          <Marker
            coordinate={{
              latitude: 24.887462200873728,
              longitude: 46.8590436493828,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
              }}>
              <FastImage
                source={icons.charging}
                style={{
                  width: 30,
                  height: 30,
                }}
                tintColor={COLORS.primary}
              />
            </View>
          </Marker>
        </MapView>
      </View>
    </View>
  );
};

NearbeStation.sharedElements = route => {
  const {psItem} = route.params;
  return [
    {
      id: `item.${psItem.id}.text`,
      animation: 'move',
      resize: 'clip',
    },
  ];
};

const styles = StyleSheet.create({
  fakeMarker: {
    position: 'absolute',
    left: '51%',
    marginLeft: -24,
    marginTop: -53,
    top: '52%',
  },
  bottomDialog: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default NearbeStation;
