import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Animated,
  Platform,
  TouchableOpacity,
  FlatList, ImageBackground,
  UIManager, StatusBar,
  LayoutAnimation,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { CheckBox, FormInput, TextButton } from '../../../components';
import axios, { all } from 'axios';
import utils from '../../../utils';
import LottieView from 'lottie-react-native';

const CARD_HEIGHT = 220;
const CARD_WIDTH = SIZES.width * 0.8;
const SPACING_FOR_CARD_INSET = SIZES.width * 0.1 - 10;
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const MyShipments = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(s => s.UserReducer);


  const [shipments, setshipments] = React.useState([]);


  const [loading, setloading] = useState(false)





  useEffect(() => {
    get_data()
    // console.log(userData)
  }, []);

  async function get_data() {
    setloading(true)

    let data_send = {
      user_id: userData.user_id,
      // user_id: 1,
      from_country: "all",
      to_country: "all"

    }
    // console.log(JSON.stringify(data_send))
    axios.post('https://camp-coding.tech/ship_shop/user/home/select_my_shipments.php', data_send).then(res => {
      console.log(JSON.stringify(res.data))
      if (res.data.status == 'success') {
        setshipments(res.data.message)
      } else {
        utils.toastAlert('error', res.data.message);
      }
      setloading(false)

    })
    // await Auth.setAccount(res.data.message);



  }
















  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>

      <StatusBar
        backgroundColor={COLORS.dark60}
      />

      <View style={{
        width: '100%',
        // height: 60,
        backgroundColor: COLORS.dark60,
        alignItems: "center",
        justifyContent: "center"

      }}>


        <View
          style={{
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
            // padding: 5,
            // alignContent: "flex-end"
          }}
        >

          <View
            style={{
              // flex: 1,
              paddingLeft: 5,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                paddingRight: 5,

              }}
              onPress={() => {
                navigation.goBack()
              }}
            >
              <FastImage
                source={icons.back}
                style={{
                  width: 25, height: 24, marginRight: SIZES.base,
                  // alignItems:"flex-end"
                }}
                resizeMode='contain'
              />
            </TouchableOpacity>

            <Text style={{
              ...FONTS.h3,
              color: "#d7d5d5",
              fontSize: 20

            }}>My Shipments</Text>
          </View>




        </View>


      </View>


      {
        loading ? (
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
        ) : (
          <>
            {shipments.length == 0 ? (
              <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }} >
                <LottieView
                  source={icons.empty}
                  autoPlay
                  loop
                  style={{ height: 180, width: '100%' }}
                  resizeMode="contain"
                />
                <Text style={{ fontFamily: FONTS.fontFamily, fontSize: 16, color: '#000' }} >
                  No Shipments Yet
                </Text>
              </View>
            ) : (

              <FlatList
                data={shipments}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      animation="fadeInRight"
                      key={index}
                      delay={index * 100}
                      useNativeDriver
                      style={{
                        backgroundColor: COLORS.white,
                        marginTop: SIZES.radius - 5,
                        borderRadius: 5,
                        padding: 5,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        paddingHorizontal: SIZES.radius,
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 5,
                        // minHeight: RFValue(40),
                        borderWidth: .1,

                        fontFamily: 'Janna LT Bold',
                        overflow: 'hidden',
                        borderColor: "#9F9FA0",
                        // height: 250,
                        width: "95%",
                        alignSelf: "center",
                        marginBottom: 5
                      }}>
                      <View

                        style={{
                          flexDirection: 'row',
                          // alignItems: 'center',
                          width: "100%",
                          justifyContent: "space-between"
                        }}>



                        <View
                          onPress={() => {
                            // setselectedZoomImage(item.factory_logo)
                            // setzoomImageModal(true), 
                          }}
                          style={{

                            justifyContent: "center",
                            alignItems: "center",
                            width: '25%',
                          }}
                        >

                          <ImageBackground
                            source={{ uri: 'https://www.lenovo.com/medias/lenovo-laptops-thinkbook-16-gen-4-intel-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTM2fGltYWdlL3BuZ3xoMjEvaGZkLzEzMjU1MTI1OTkxNDU0LnBuZ3xlMGJjMDAyZjIzYzczYmY0YTY3NTlmODcwMDJjZTBhMzg5M2VlMjFlNTNlZWJkZDMyNDA3MTdlNjc3NjhhZWY5' }}
                            style={{
                              width: 80,
                              height: 100,
                              marginLeft: -20,
                              marginTop: -15,
                              justifyContent: "flex-end"
                            }}
                            resizeMode='contain'
                          >

                            <View
                              style={{
                                backgroundColor: COLORS.bag10Bg,
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center"

                              }}
                            >
                              <Text>
                                {item.total_waight.toFixed(2)} KG
                              </Text>
                            </View>

                          </ImageBackground>





                        </View>


                        <View
                          style={{

                            width: '80%',

                          }}>
                          <Text
                            style={{
                              fontFamily: 'Janna LT Bold', color: "#000",
                              fontSize: 18,
                              textAlign: "left"
                            }}
                          >
                            {item.shipment_name}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-around",
                              marginTop: 10
                            }}
                          >

                            <Text
                              style={{
                                fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                                fontSize: 15,
                                textAlign: "left"
                              }}
                            >
                              {item.to_country}
                            </Text>
                            <FastImage
                              source={icons.plane}
                              style={{
                                width: 30, height: 30, marginRight: SIZES.base,
                                // alignItems:"flex-end"
                              }}
                              resizeMode='contain'
                            />
                            <Text
                              style={{
                                fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                                fontSize: 15,
                                textAlign: "left"
                              }}
                            >
                              {item.from_country}
                            </Text>

                          </View>
                          <View
                            style={{
                              // alignSelf: "flex-start",
                              // marginLeft: 15,
                              width: "90%"
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                                fontSize: 15,
                                textAlign: 'left'
                              }}
                            >

                              {"before " + moment(item.before_date).locale('en').format('dddd, D MMM YYYY')}

                            </Text>
                          </View>


                        </View>


                      </View>




                    </View>

                  )
                }}
              />
            )}
          </>
        )
      }






      {/* {renderMap()} */}
      {/* {stationsArr && renderPlaces()} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignSelf: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  scrollView: {
    position: 'absolute',
    bottom: RFValue(60),
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    elevation: 2,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffcardImageset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
    marginBottom: 4,
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
});
export default MyShipments;
