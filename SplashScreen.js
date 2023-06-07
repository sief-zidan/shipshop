import React, {useEffect, useRef} from 'react';
import {View, Image, StatusBar} from 'react-native';
import {COLORS, FONTS, icons, images} from './src/constants';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';
const SplashScreen = () => {
  const imgRef = useRef();
  const loRef = useRef();
  const iconRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      loRef.current.fadeOutDown(600);
      iconRef.current.flipOutY(200);
      imgRef.current.fadeOutDown(600);
    }, 2600);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: COLORS.white,
      }}>
      <StatusBar backgroundColor={COLORS.primary} />

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Animatable.Image
          ref={iconRef}
          delay={700}
          animation={'flipInY'}
          source={images.main_logo_full}
          style={{
            width: RFValue(190),
            height: RFValue(190),
            marginBottom: RFValue(80),
          }}
          resizeMode="contain"
        />

        <Animatable.Image
          ref={imgRef}
          delay={200}
          animation={'fadeInUpBig'}
          source={images.botcar}
          style={{
            width: '100%',
            height: '50%',
          }}
          resizeMode="stretch"
        />
        <Animatable.Image
          ref={loRef}
          delay={200}
          animation={'fadeInUpBig'}
          source={images.main_logo_full}
          style={{
            position: 'absolute',
            bottom: RFPercentage(30),
            // left: 20,
            alignSelf: 'center',
            width: RFValue(80),
            height: RFValue(80),
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default SplashScreen;
