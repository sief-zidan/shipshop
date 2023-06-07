import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { COLORS, FONTS, images, SIZES } from '../../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import { SliderBox } from 'react-native-image-slider-box';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ShipmentItem = ({ item, index, onPressImage, lenItems }) => {
  return (
    <Animatable.View
      animation="fadeInRight"
      key={index}
      delay={index * 50}
      useNativeDriver
      style={{
        backgroundColor: COLORS.white,
        marginTop: SIZES.base,
        borderRadius: SIZES.base,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // alignItems: 'center',
        // justifyContent: 'center',
        elevation: 5,
        flex: 1,
        // overflow: 'hidden',
      }}>
      {lenItems && index == 0 && (
        <Text
          style={{
            ...FONTS.h4,
            fontWeight: 'bold',
            color: COLORS.darkgray,
          }}>
          {lenItems}
        </Text>
      )}
      {/* <FastImage
resizeMode="contain"
/> */}
      <View style={{ alignItems: 'center', flex: 1 }}>
        <SliderBox
          ImageComponent={FastImage}
          images={item.item_images}
          sliderBoxHeight={RFValue(200)}
          onCurrentImagePressed={index => onPressImage(index)}
          dotColor={COLORS.primary}
          inactiveDotColor={COLORS.dark08}
          paginationBoxVerticalPadding={20}
          // autoplay
          // circleLoop
          resizeMethod={'resize'}
          resizeMode={'contain'}
          paginationBoxStyle={{
            position: 'absolute',
            bottom: 0,
            padding: 0,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: 'rgba(128, 128, 128, 0.92)',
          }}
          ImageComponentStyle={{ borderRadius: 15, width: '97%', marginTop: 5 }}
          imageLoadingColor="#2196F3"
        />
      </View>

      <Text
        style={{
          ...FONTS.h3,
          color: COLORS.darkGray,

          fontWeight: 'bold',
        }}>
        {item.item_name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          //   alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.grey20,
          borderRadius: 100,
        }}>
        <View
          style={{
            padding: SIZES.radius,
            flex: 1
          }}>
          <Text
            numberOfLines={1}
            style={{ ...FONTS.h3, color: COLORS.support1 }}>
            {item?.item_link}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(item?.item_link);
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.primary,
            // width:RFValue()
            // height: '100%',
            borderRadius: 100,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            // alignItems: 'center',
            // justifyContent: 'center',
            elevation: 5,
            paddingHorizontal: SIZES.padding,
            // height: '100%',
          }}>
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.black,
              fontWeight: 'bold',
            }}>
            VISIT LINK
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          //   alignItems: 'center',
          // justifyContent: 'space-between',
          //   backgroundColor: 'red',
        }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              //   justifyContent: 'flex-start',
            }}>
            <MaterialCommunityIcons
              name="weight"
              size={RFValue(24)}
              color={COLORS.primary}
            />
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.gray,
              }}>
              {'   '}single item weight
            </Text>
          </View>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.gray,
              marginLeft: RFValue(24),
              fontWeight: 'bold',
            }}>
            {'   '}
            {item.weight} KG
          </Text>


          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.gray,
              marginLeft: RFValue(24),
            }}>
            {'   '}item category
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.gray,
              marginLeft: RFValue(24),
              fontWeight: 'bold',
            }}>
            {'   '}
            {item?.category}
          </Text>
        </View>

      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name="md-cube-sharp"
            size={RFValue(24)}
            color={COLORS.primary}
          />
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.gray,
            }}>
            {'   '}item quentity
          </Text>
        </View>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.gray,
            marginLeft: RFValue(24),
            fontWeight: 'bold',
          }}>
          {'   '}
          {item.item_quantity}
        </Text>
      </View>
    </Animatable.View>
  );
};

export default ShipmentItem;
