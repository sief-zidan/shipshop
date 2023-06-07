import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header, IconButton, TextButton} from '../../../components';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {AppData, COLORS, FONTS, icons, images, SIZES} from '../../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setUser} from '../../../redux/reducers/UserReducer';
import {useDispatch} from 'react-redux';
import Auth from '../../../Services';
import utils from '../../../utils';
const SignOTP = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {uData} = route.params;
  const [timer, setTimer] = React.useState(60);
  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  });
  function renderHeader() {
    return (
      <Header
        title={'مصادقة رقم الهاتف'}
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

  function renderBody() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding * 2,
        }}>
        <View
          style={{
            marginVertical: SIZES.padding * 2,
          }}>
          <Text style={{textAlign: 'center', ...FONTS.h2}}>
            OTP Authentication
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.darkGray,
              marginTop: SIZES.base,
              ...FONTS.body3,
              lineHeight: 30,
            }}>
            تم إرسال رمز المصادقة إلى رقم هاتف {uData.user_phone}
          </Text>
        </View>
        <OTPInputView
          pinCount={4}
          style={{
            width: '100%',
            height: 50,
          }}
          codeInputFieldStyle={{
            width: 65,
            height: 65,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            color: COLORS.black,
            ...FONTS.h3,
          }}
          onCodeFilled={async code => {}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: SIZES.padding,
          }}>
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.body3,
            }}>
            لم تحصل على كود ؟
          </Text>
          <TextButton
            label={` إعادة إرسال (${timer} ث)`}
            disabled={timer == 0 ? false : true}
            buttonContainerStyle={{
              backgroundColor: null,
              marginRight: SIZES.base,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => setTimer(60)}
          />
        </View>
        <View></View>
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
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={-300}
        showsVerticalScrollIndicator={false}>
        {renderBody()}
      </KeyboardAwareScrollView>
      <TextButton
        label={'تأكيد'}
        buttonContainerStyle={{
          height: 50,
          alignItems: 'center',
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
          marginBottom: RFValue(20),
          width: '90%',
          alignSelf: 'center',
        }}
        onPress={async () => {
          utils.toastAlert('success', 'اهلا بكم فى النيرة للطاقة');
          dispatch(setUser(uData));
          await Auth.setAccount(uData);
        }}
      />
    </View>
  );
};

export default SignOTP;
