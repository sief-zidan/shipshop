import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import {COLORS, FONTS, images, SIZES} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';

const ShelfItem = ({item, index, onPress}) => {
  return (
    <Animatable.View
      animation="fadeInRight"
      key={index}
      delay={index * 100}
      useNativeDriver
      style={{
        backgroundColor: COLORS.white,
        marginTop: SIZES.radius,
        borderRadius: SIZES.base,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      <TouchableOpacity
        onPress={() => {
          onPress(item);
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginRight: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FastImage
            source={images.shelving}
            style={{
              width: RFValue(24),
              height: RFValue(24),
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={
              {
                // flexDirection: 'row',
                // alignItems: 'center',
                // justifyContent: 'space-between',
              }
            }>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
              }}>
              {item.label}
            </Text>
          </View>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: FONTS.fontFamily,
            }}>
            {item.product}
          </Text>
        </View>
        {item.whight_range && (
          <View
            style={{
              // width: RFValue(40),
              paddingHorizontal: SIZES.base,
              height: RFValue(40),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.secondary,
              borderRadius: 8,
            }}>
            <Text
              style={{...FONTS.h6, color: COLORS.white, textAlign: 'center'}}>
              {item.whight_range + '\n'} whight range
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default ShelfItem;
