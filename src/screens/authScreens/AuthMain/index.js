import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet, ScrollView, ActivityIndicator
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { CheckBox, FormInput, IconButton, TextButton } from '../../../components';
import { MotiView, useAnimationState } from 'moti';
import { Shadow } from 'react-native-shadow-2';
import { FONTS, SIZES, COLORS, icons, images } from '../../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import utils from '../../../utils';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/reducers/UserReducer';
import Auth from '../../../Services';
import axios, { all } from 'axios';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'

const AuthMain = ({ navigation }) => {


  const [image_path, setimage_path] = React.useState('')

  function chooseFile() {
    var options = {
      title: 'Select Image',

      storageOptions: {
        skipBackup: true,
        path: 'images',
        color: "#000",
      },
    };
    ImagePicker.showImagePicker(options, response => {
      // console.log(response)
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let source = response;
        // let obj = this.state.question_obj
        // obj.question_image = source.uri

        setimage_path(source.data)
        // console.log(source)


      }
    });
  };




  const dispatch = useDispatch();
  // States
  const [mode, setMode] = useState('signIn');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isVisable, setIsVisable] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [loading, setloading] = useState(false);


  // Animation States
  const animationState = useAnimationState({
    signIn: {
      height: SIZES.height * 0.56,
    },
    signUp: {
      height: SIZES.height * 0.65,
    },
  });

  useEffect(() => {
    animationState.transitionTo('signIn');
  }, []);

  async function _checkSignin() {
    if (phone != '' && password != '') {

      setloading(true)

      let data_send = {
        email: email,
        password: password

      }
      // console.log(JSON.stringify(data_send))


      axios.post('https://camp-coding.tech/ship_shop/user/auth/user_login.php', data_send).then(res => {
        if (res.data.status == 'success') {
          // console.log(res.data)
          dispatch(setUser(res.data.message));
          storedata(res.data.message)
          navigation.navigate('SignOTP', {
            uData: res.data.message,
          });
        } else {
          utils.toastAlert('error', res.data.message);
        }
        setloading(false)

      })

    } else {
      utils.toastAlert('error', 'tray agine later');

    }
  }

  // async function _checkSignup() {
  //   if (email != '' && name != '' && phone != '' && password != '') {
  //     let uData = {
  //       name: name,
  //       email: email,
  //       password: password,
  //       phone: phone,
  //       image: image_path
  //     };

  //     axios.post('https://camp-coding.tech/ship_shop/user/auth/user_signup.php', uData).then(res => {
  //       console.log(uData)
  //       if (res.data.status == 'success') {
  //         dispatch(setUser(res.data.message));
  //         // navigation.navigate('SignOTP', {
  //         //   uData : res.data.message,
  //         // });

  //       } else {
  //         utils.toastAlert('error', res.data.message);
  //       }

  //     })
  //     // await Auth.setAccount(res.data.message);


  //   } else {
  //     utils.toastAlert('error', 'برجاء استكمال بيانات التسجيل');
  //   }
  // }


  async function _checkSignup() {

    if (email != '' && name != '' && phone != '' && password != '') {
      setloading(true)
      let uData = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        image: image_path
      };

      RNFetchBlob.fetch(
        'POST',
        `https://camp-coding.tech/ship_shop/user/auth/user_signup.php`,
        {
          Authorization: 'Bearer access-token',
          otherHeader: 'foo',
          'Content-Type': 'multipart/form-data',
        },
        [
          // element with property `filename` will be transformed into `file` in form data
          {
            name: 'image',
            filename: 'avatar.png',
            type: 'image/png',
            data: image_path,
          },
          {
            name: 'name',
            data: name
          },
          {
            name: 'password',
            data: password
          },
          {
            name: 'email',
            data: email
          },
          {
            name: 'phone',
            data: phone
          }

        ])
        .then(resp => {
          let resx = resp.data

          resx = resx.replace('\n', '')
          resx = JSON.parse(resx)
          console.log(resx)
          if (resx.status == 'success') {

            dispatch(setUser(resx.message));
            navigation.navigate('SignOTP', {
              uData: resx.message,
            });
            storedata(resx.message)
            //
          } else {

            utils.toastAlert('error', resx.message);
          }
          setloading(false)
        })



    } else {
      utils.toastAlert('error', 'tray agine later');
      // utils.toastAlert('error', 'برجاء استكمال بيانات التسجيل');
    }



  }
  async function storedata(data) {

    await Auth.setAccount(data);
  }



  function renderSignIn() {
    return (
      <MotiView
        state={animationState}
        style={{
          marginTop: SIZES.padding,
          alignSelf: 'center',
        }}>
        <Shadow>
          <View style={styles.authContainer}>
            <Text
              style={{
                width: '60%',
                lineHeight: 45,
                color: COLORS.darkBlue,
                ...FONTS.h2,
              }}>
              Login to Continue
            </Text>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              enableOnAndroid={true}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              extraScrollHeight={-300}
              contentContainerStyle={
                {
                  // flexGrow: 1,
                  // justifyContent: 'center',
                }
              }>
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                keyboardType="email-address"
                placeholder="Email"
                value={email}
                onChange={text => setEmail(text)}
                prependComponent={
                  <FastImage
                    source={icons.email}
                    style={{ width: 25, height: 24, marginRight: SIZES.base }}
                  />
                }
              />
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                placeholder="Password"
                value={password}
                secureTextEntry={!isVisable}
                onChange={text => setPassword(text)}
                prependComponent={
                  <FastImage
                    source={icons.lock}
                    style={{ width: 25, height: 24, marginRight: SIZES.base }}
                  />
                }
                appendComponent={
                  <IconButton
                    icon={isVisable ? icons.eye : icons.eye_off}
                    iconStyle={{
                      tintColor: COLORS.gray,
                    }}
                    onPress={() => setIsVisable(!isVisable)}
                  />
                }
              />



            </KeyboardAwareScrollView>
            <TextButton
              label={'Login'}
              buttonContainerStyle={{
                height: 55,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                marginTop: RFValue(20),
              }}
              loading={loading}

              labelStyle={{
                ...FONTS.h3,
                color: COLORS.white,
              }}
              onPress={() => _checkSignin()}
            />
          </View>
        </Shadow>
      </MotiView>
    );
  }

  function renderSignUp() {
    return (
      <MotiView
        state={animationState}
        style={{
          marginTop: SIZES.padding,
          alignSelf: 'center',
        }}>
        <Shadow>
          <View style={styles.authContainer}>
            <Text
              style={{
                width: '60%',
                lineHeight: 45,
                color: COLORS.darkBlue,
                ...FONTS.h2,
              }}>
              Create new Account
            </Text>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              extraScrollHeight={-300}
              contentContainerStyle={{
                flexGrow: 1,
                marginTop: SIZES.padding,
                paddingBottom: SIZES.padding * 2,
              }}>
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                placeholder="name"
                value={name}
                onChange={text => setName(text)}
                prependComponent={
                  <FastImage
                    source={icons.person}
                    style={{ width: 25, height: 24, marginRight: SIZES.base }}
                  />
                }
              />
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                keyboardType="email-address"
                placeholder="Email"
                value={email}
                onChange={text => setEmail(text)}
                prependComponent={
                  <FastImage
                    source={icons.email}
                    style={{ width: 25, height: 24, marginRight: SIZES.base }}
                  />
                }
              />
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                placeholder="كلمة المرور"
                value={password}
                secureTextEntry={!isVisable}
                onChange={text => setPassword(text)}
                prependComponent={
                  <FastImage
                    source={icons.lock}
                    style={{ width: 25, height: 24, marginRight: SIZES.base }}
                  />
                }
                appendComponent={
                  <IconButton
                    icon={isVisable ? icons.eye : icons.eye_off}
                    iconStyle={{
                      tintColor: COLORS.gray,
                    }}
                    onPress={() => setIsVisable(!isVisable)}
                  />
                }
              />
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                keyboardType="phone-pad"
                placeholder="phone number"
                value={phone}
                onChange={text => setPhone(text)}
                prependComponent={
                  <FastImage
                    source={icons.phoneicon}
                    style={{ width: 25, height: 24, marginRight: SIZES.base }}
                  />
                }
              />
              {/* Terms & conditions */}
              {/* <CheckBox
                containerStyle={{
                  marginTop: SIZES.radius,
                }}
                isSelected={termsChecked}
                onPress={() => setTermsChecked(!termsChecked)}
              /> */}

              {image_path == "" ? (
                <TouchableOpacity
                  onPress={() => {
                    chooseFile()

                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 15,
                    borderBottomWidth: .5,
                    width: "60%",
                    alignSelf: "center",
                    borderColor: "#9F9FA0"
                  }}
                >

                  <Text
                    style={{
                      ...SIZES.h3,
                      fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                      fontSize: 15,
                      textAlign: "left",
                      ...FONTS.h3,
                    }}
                  >
                    {'upload image'}
                  </Text>
                  <FastImage
                    source={icons.upload}
                    style={{
                      width: 30, height: 30, marginRight: SIZES.base,
                      // alignItems:"flex-end"
                    }}
                    resizeMode='contain'
                  />


                </TouchableOpacity>
              ) : (

                <View
                  onPress={() => {
                    chooseFile()

                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 15,
                    borderBottomWidth: .5,
                    width: "50%",
                    alignSelf: "center",
                    borderColor: "#9F9FA0"
                  }}
                >

                  <Text
                    style={{
                      ...SIZES.h3,
                      fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                      fontSize: 15,
                      textAlign: "left",
                      ...FONTS.h3,
                    }}
                  >
                    {'image upload successfly'}
                  </Text>
                  <FastImage
                    source={icons.checkmark}
                    style={{
                      width: 30, height: 30, marginRight: SIZES.base,
                      // alignItems:"flex-end"
                    }}
                    resizeMode='contain'
                    />


                </View>


              )}

            </KeyboardAwareScrollView>
            <TextButton
              label={'Create account'}
              buttonContainerStyle={{
                height: 55,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                marginTop: RFValue(20),
              }}
              loading={loading}
              labelStyle={{
                ...FONTS.h3,
                color: COLORS.white,
              }}
              onPress={() => _checkSignup()}
            />
          </View>
        </Shadow>
      </MotiView>
    );
  }
  function renderAuthContainer() {
    if (mode == 'signIn') {

      return (
        renderSignIn()
        // renderSignUp()
      )
    } else {
      return renderSignUp();
    }
  }

  function renderAuthContainerFooter() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 80,
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginTop: -30,
          marginHorizontal: SIZES.radius,
          paddingBottom: SIZES.radius,
          borderBottomLeftRadius: SIZES.radius,
          borderBottomRightRadius: SIZES.radius,
          backgroundColor: COLORS.light60,
          zIndex: 0,
        }}>
        <Text
          style={{
            color: COLORS.gray,
            ...FONTS.body5,
          }}>
          {mode == 'signIn' ? "Don't have account" : 'Have Account'}
        </Text>
        <TextButton
          label={mode == 'signIn' ? 'Create New Account' : 'Login'}
          buttonContainerStyle={{
            marginLeft: SIZES.base,
            backgroundColor: null,
          }}
          labelStyle={{
            color: COLORS.support4,
            ...FONTS.h5,
          }}
          onPress={() => {
            if (animationState.current === 'signIn') {
              animationState.transitionTo('signUp');
              setMode('signUp');
            } else {
              animationState.transitionTo('signIn');
              setMode('signIn');
            }
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FastImage
        source={images.main_logo_full}
        style={{
          alignSelf: 'center',
          marginTop: SIZES.padding * 2,
          width: RFValue(80),
          height: RFValue(80),
        }}
      />
      {/* Auth Container */}
      <View
        style={{
          zIndex: 1,
        }}>
        {renderAuthContainer()}
      </View>

      {renderAuthContainerFooter()}

      {/* {mode === 'signIn'} */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.lightGray,
  },
  authContainer: {
    flex: 1,
    width: SIZES.width - SIZES.padding * 2,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.light,
    // alignSelf: 'center',
    zIndex: 1,
  },
  socialButtonContainer: {
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray3,
  },
});

export default AuthMain;
