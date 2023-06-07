import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES, FONTS, images, icons} from '../../../constants';
import {Header, IconButton} from '../../../components';
import {SharedElement} from 'react-navigation-shared-element';
import {RFValue} from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import {Shadow} from 'react-native-shadow-2';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';

import moment from 'moment';
import {Button} from 'react-native-paper';
import utils from '../../../utils';
const StationDetails = ({navigation, route}) => {
  const {psItem} = route.params;
  const [openStartDate, setOpenStartDate] = useState(false);
  const [startDateValue, setStartDateValue] = useState('');
  const [openEndDate, setOpenEndDate] = useState(false);
  const [endDateValue, setEndDateValue] = useState('');
  const [chargersArr, setChargersArr] = useState([
    {
      charger_id: 1,
      charger_available: 0,
      charger_endDate: '2023-03-25 14:15:12',
      selected: false,
    },
    {
      charger_id: 2,
      charger_available: 0,
      charger_endDate: '2023-03-25 16:14:08',
      selected: false,
    },
    {
      charger_id: 3,
      charger_available: 1,
      selected: false,
    },
    {
      charger_id: 4,
      charger_available: 1,
      selected: false,
    },
    {
      charger_id: 5,
      charger_available: 0,
      charger_endDate: '2023-03-27 09:10:6',
      selected: false,
    },
    {
      charger_id: 6,
      charger_available: 1,
      selected: false,
    },
    {
      charger_id: 7,
      charger_available: 1,
      selected: false,
    },
  ]);
  const [selectedItem, setSelctedItem] = useState({});
  function renderHeader() {
    return (
      <Header
        title={psItem?.station_name}
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 25,
        }}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{rotate: '180deg'}],

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
        }
        rightComponent={<View style={{width: 40}} />}
      />
    );
  }
  function renderBoday() {
    return (
      <View>
        <SharedElement
          id={`item.${psItem?.station_id}.img`}
          style={{
            width: '100%',
            height: RFValue(150),
            marginBottom: RFValue(10),
          }}>
          <FastImage
            source={psItem?.image}
            style={{
              width: '100%',
              height: RFValue(150),
              borderRadius: SIZES.base,
            }}
            resizeMode="stretch"
          />
        </SharedElement>

        {Object.keys(selectedItem).length > 0 && (
          <Animatable.View animation={'fadeIn'}>
            <View
              style={{
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
                width: '100%',
                backgroundColor: COLORS.lightGray,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,

                justifyContent: 'space-between',
                flexWrap: 'wrap',
                ...COLORS.shadow,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: RFValue(20),
                    height: RFValue(20),
                    backgroundColor:
                      selectedItem?.charger_available == 0
                        ? COLORS.red
                        : COLORS.third,
                    borderRadius: RFValue(20 / 2),
                    marginRight: RFValue(10),
                  }}
                />
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.black,
                  }}>
                  {selectedItem?.charger_available == '0' ? 'غير متاح' : 'متاح'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View>
                  {selectedItem?.charger_available == '0' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: FONTS.fontFamily,
                            fontSize: 11,

                            color: COLORS.black,
                          }}>
                          مشغول لحين تاريخ
                        </Text>
                        <Text
                          style={{
                            fontFamily: FONTS.fontFamily,
                            fontSize: 11,
                            color: COLORS.black,
                          }}>
                          {moment(selectedItem?.charger_endDate).format('LLL')}
                        </Text>
                      </View>
                      <FastImage
                        source={images.nearbyStation}
                        style={{
                          width: RFValue(40),
                          height: RFValue(40),
                          marginLeft: RFValue(10),
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  ) : (
                    <>
                      <Button
                        onPress={() => {
                          setOpenStartDate(true);
                        }}
                        mode="contained"
                        buttonColor={COLORS.primary}
                        labelStyle={{
                          ...FONTS.h3,
                        }}
                        style={{
                          borderRadius: 8,
                        }}>
                        {startDateValue == ''
                          ? 'تاريخ البداية'
                          : moment(startDateValue).format('lll')}
                      </Button>
                      <Button
                        onPress={() => {
                          setOpenEndDate(true);
                        }}
                        mode="contained"
                        buttonColor={COLORS.primary}
                        labelStyle={{
                          ...FONTS.h3,
                        }}
                        style={{
                          borderRadius: 8,
                          marginTop: 4,
                        }}>
                        {endDateValue == ''
                          ? 'تاريخ النهاية'
                          : moment(endDateValue).format('lll')}
                      </Button>
                      {/* <TouchableOpacity>
                        <Text
                          style={{
                            ...FONTS.h3,
                            color: COLORS.black,
                          }}>
                          حدد تاريخ البداية
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity>
                        <Text
                          style={{
                            ...FONTS.h3,
                            color: COLORS.black,
                          }}>
                          حدد تاريخ النهاية
                        </Text>
                      </TouchableOpacity> */}
                    </>
                  )}
                </View>
              </View>
            </View>
          </Animatable.View>
        )}

        <View
          style={{
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            width: '100%',
            backgroundColor: COLORS.lightGray,
            flexDirection: 'row',
            alignItems: 'center',

            justifyContent: 'space-between',
            flexWrap: 'wrap',
            ...COLORS.shadow,
          }}>
          {chargersArr.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelctedItem(item);
              }}
              activeOpacity={item.charger_available == 0 ? 1 : 0.5}
              style={{
                width: RFValue(100),
                alignItems: 'center',
                marginBottom: SIZES.base,
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.black,
                }}>{`CH #${++index}`}</Text>
              <FastImage
                source={icons.charging}
                style={{
                  width: RFValue(60),
                  height: RFValue(60),
                }}
                tintColor={
                  item.charger_available == 0
                    ? COLORS.red
                    : item.charger_id == selectedItem?.charger_id
                    ? COLORS.green
                    : COLORS.gray
                }
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius,
        }}
        showsVerticalScrollIndicator={false}>
        {renderBoday()}
        {startDateValue && endDateValue && (
          <Button
            onPress={() => {
              utils.toastAlert(
                'info',
                'تنبية تأكيد الحجز',
                'يجيب دفع مبلغ الشحن او علي الاقل 25% منه لتأكيد الحجز',
              );
            }}
            mode="contained"
            buttonColor={COLORS.primary}
            labelStyle={{
              ...FONTS.h3,
              color: COLORS.white,
            }}
            style={{
              borderRadius: 8,
              marginVertical: 12,
            }}>
            تأكيد الحجز
          </Button>
        )}
      </ScrollView>
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
};

StationDetails.sharedElements = route => {
  const {psItem} = route.params;
  return [
    {
      id: `item.${psItem.station_id}.img`,
      animation: 'move',
      resize: 'clip',
    },
  ];
};

export default StationDetails;
