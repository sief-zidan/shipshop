import { View, Text, ScrollView, Image } from 'react-native';
import React, {useState} from 'react';
import {FormInput, Header, TextIconButton} from '../../../components';
import {COLORS, FONTS, icons, images, SIZES} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import Auth from '../../../Services';
import {removeUser} from '../../../redux/reducers/UserReducer';
import {RFValue} from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-paper';

const AnimatedRowView = ({title, onPress, index, image}) => {
  return (
    <Animatable.View delay={index * 50} animation="fadeInRightBig">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: 8,
          height: RFValue(70),
          padding: 8,
          marginBottom: RFValue(30),
          backgroundColor: COLORS.white,
          ...COLORS.shadow,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.black,
            }}>
            {title}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.gray3,
            position: 'absolute',
            right: -8,
            borderBottomEndRadius: 8,
            borderTopEndRadius: 8,
            height: RFValue(80),
            width: RFValue(80),
          }}>
          <FastImage
            source={image}
            style={{
              height: RFValue(60),
              width: RFValue(60),
            }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};
const Settings = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector(s => s.UserReducer);
  const [isEditableMode, setIsEditableMode] = useState(false);

  function renderHeader() {
    return (
      <Header
        title={'Settings'}
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 25,
        }}

        twoRight={true}
      />
    );
  }

  function renderBody() {
    return (
      <View
        style={{
          padding: SIZES.padding,
          marginBottom: RFValue(66),
        }}>
        {userData.profile_image_url == '' ? (


        <FastImage
          source={icons.person}
          style={{
            width: RFValue(80),
            height: RFValue(80),
            alignSelf: 'center',
          }}
          tintColor={COLORS.gray}
          resizeMode="contain"
        />
        ) : (
          <Image
            source={{ uri: userData.profile_image_url }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              alignSelf: "center"
            }}
          />
        )}
        <Text
          style={{
            marginTop: SIZES.radius,
            fontFamily: FONTS.fontFamily,
            ...FONTS.h3,
            marginLeft: 25,
          }}>
          User Name
        </Text>
        <FormInput
          //   label="الإسم"
          editable={isEditableMode}
          placeholder={'Enter Your Name'}
          containerStyle={{
            marginTop: -20,
            width: '100%',
            alignSelf: 'center',
          }}
          inputStyle={{
            fontFamily: FONTS.fontFamily,
          }}
          value={userData?.user_name}
          onChange={value => {
            setUserNameError(false);
            setUserName(value);
          }}
        />

        <Text
          style={{
            marginTop: SIZES.radius,
            fontFamily: FONTS.fontFamily,
            ...FONTS.h3,
            marginLeft: 25,
          }}></Text>
        <FormInput
          //   label="الإسم"
          editable={isEditableMode}
          placeholder={'Enter Your Password'}
          containerStyle={{
            marginTop: -20,
            width: '100%',
            alignSelf: 'center',
          }}
          inputStyle={{
            fontFamily: FONTS.fontFamily,
          }}
          value={userData?.user_email}
          onChange={value => {
            setUserNameError(false);
            setUserName(value);
          }}
        />

        <Text
          style={{
            marginTop: SIZES.radius,
            fontFamily: FONTS.fontFamily,
            ...FONTS.h3,
            marginLeft: 25,
          }}></Text>
        {/* <FormInput
          //   label="الإسم"
          editable={isEditableMode}
          placeholder={'Enter Your Password'}
          containerStyle={{
            marginTop: -20,
            width: '100%',
            alignSelf: 'center',
          }}
          inputStyle={{
            fontFamily: FONTS.fontFamily,
          }}
          value={userData?.user_phone}
          onChange={value => {
            setUserNameError(false);
            setUserName(value);
          }}
        /> */}
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderBody()}
      </ScrollView>

      <Button
        // disabled={!isEditableMode}
        onPress={async () => {
          dispatch(removeUser());
          await Auth.logout();
        }}
        mode="contained"
        buttonColor={COLORS.red}
        labelStyle={{
          ...FONTS.h3,
          color: COLORS.white,
          paddingVertical: 4,
        }}
        style={{
          borderRadius: 8,
          marginTop: RFValue(10),
          marginBottom: RFValue(90),
          width: '90%',
          alignSelf: 'center',
        }}>
        Logout
      </Button>
    </View>
  );
};

export default Settings;
