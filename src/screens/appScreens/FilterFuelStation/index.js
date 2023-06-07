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
  UIManager, Modal,
  LayoutAnimation, ActivityIndicator
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { CheckBox, FormInput, TextButton } from '../../../components';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import utils from '../../../utils';

const CARD_HEIGHT = 220;
const CARD_WIDTH = SIZES.width * 0.8;
const SPACING_FOR_CARD_INSET = SIZES.width * 0.1 - 10;
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Trips = ({ navigation }) => {

  const dispatch = useDispatch();
  const { userData } = useSelector(s => s.UserReducer);




  const [shipments, setshipments] = React.useState([

  ]);

  const [from_countery, setfrom_countery] = useState('');
  const [to_countery, setto_countery] = useState('');
  const [date_selected, setdate_selected] = useState('');
  const [weight, setweight] = useState('');
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [open_search, setopen_search] = useState(false)
  const [shipment_modal, setshipment_modal] = useState(false)
  const [loading, setloading] = useState(false)




  useEffect(() => {
    get_data()
  }, []);

  async function get_data() {
    setloading(true)

    let data_send = {
      from_country: "all",
      to_country: "all",
      before_date: "all",
      weight: "all"
    }

    axios.post('https://camp-coding.tech/ship_shop/user/home/select_trips.php', data_send).then(res => {
      // console.log(JSON.stringify(res.data))
      if (res.data.status == 'success') {
        setshipments(res.data.message)
      } else {
        utils.toastAlert('error', res.data.message);
      }
      setloading(false)

    })
    // await Auth.setAccount(res.data.message);



  }

  const [selected_trip, setselected_trip] = useState({})

  const [mycurrentshipments, setmycurrentshipments] = React.useState(
    []
  );


  const [loading_trips, setloading_trips] = React.useState([]);
  async function get_data_my_trips(item) {
    setloading_trips(true)

    // console.log(JSON.strisetloading_tripsngify(item))

    let data_send = {
      user_id: userData.user_id,
      to_country: item.to_country,
      from_country: item.from_country,
      // user_id: 1
    }
    // console.log(JSON.stringify(data_send))


    axios.post('https://camp-coding.tech/ship_shop/user/home/select_my_shipments.php', data_send).then(res => {
      if (res.data.status == 'success') {
        // console.log(res.data.message)
        // setmycurrentshipments(res.data.message)
        setshipment_modal(true)
      } else {
        utils.toastAlert('error', res.data.message);
      }
      setloading_trips(false)

    })
    // await Auth.setAccount(res.data.message);



  }





  async function search_func() {
    setloading(true)

    let data_send = {
      from_country: from_countery == '' ? 'all' : from_countery,
      to_country: to_countery == '' ? 'all' : to_countery,
      before_date: date_selected == '' ? 'all' : date_selected,
      weight: weight == '' ? 'all' : weight
    }

    axios.post('https://camp-coding.tech/ship_shop/user/home/select_trips.php', data_send).then(res => {
      // console.log(data_send)
      if (res.data.status == 'success') {
        setshipments(res.data.message)
      } else {
        utils.toastAlert('error', res.data.message);
      }
      setloading(false)

    })
    // await Auth.setAccount(res.data.message);



  }

  const [loading_request, setloading_request] = React.useState([false]);


  function order_request(data, index) {
    let load = loading_request;
    load[index] = true;
    setloading_request(load)

    setloading_request(load)
    let trip_data = selected_trip
    let ship_data = data


    let data_send = {
      trip_id: trip_data.trip_id,
      shipment_id: ship_data.shipment_id,
      from_user_id: userData.user_id,
      to_user_id: trip_data.user_id,
      type: 'trip_request',
    }
    console.log(JSON.stringify(data_send))
    axios.post('https://camp-coding.tech/ship_shop/user/home/add_request_trip.php', data_send).then(res => {
      // console.log(res.data)
      if (res.data.status == 'success') {
        setshipment_modal(false)
        setTimeout(() => {
          utils.toastAlert('success', "request send successfly");
        }, 500);

      } else {
        setshipment_modal(false)
        utils.toastAlert('error', res.data.message);
      }
      let load = loading_request;
      load[index] = false;
      setloading_request(load)


    })
    // await Auth.setAccount(res.data.message);


  }








  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View
        style={{
          // height: SIZES.height * .3,
          // marginBottom: 10,
          backgroundColor: COLORS.primary
        }}
      >


        {open_search ? (
          <>


            <FormInput
              containerStyle={{
                marginTop: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.error,
                width: "95%",
                alignSelf: "center"
              }}
              keyboardType="phone-pad"
              placeholder="from (ctiy - country)"
              value={from_countery}
              onChange={text => setfrom_countery(text)}
              prependComponent={
                <FastImage
                  source={icons.phone}
                  style={{
                    width: 25, height: 24, marginRight: SIZES.base,
                    // alignItems:"flex-end"
                  }}
                />
              }
            />
            <FormInput
              containerStyle={{
                marginTop: SIZES.radius,

                borderRadius: SIZES.radius,
                backgroundColor: COLORS.error,
                width: "95%",
                alignSelf: "center"
              }}
              keyboardType="phone-pad"
              placeholder="to (ctiy - country)"

              value={to_countery}
              onChange={text => setto_countery(text)}
              prependComponent={
                <FastImage
                  source={icons.plandown}
                  style={{
                    width: 25, height: 24, marginRight: SIZES.base,
                    // alignItems:"flex-end"
                  }}
                  resizeMode='contain'
                />
              }
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >

              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,

                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                  width: "40%",
                  alignSelf: "center",
                  marginBottom: 10
                }}
                keyboardType="phone-pad"
                placeholder="weight"
                value={weight}
                onChange={text => setweight(text)}
                prependComponent={
                  <FastImage
                    source={icons.kg}
                    style={{
                      width: 25, height: 24, marginRight: SIZES.base,
                      // alignItems:"flex-end"
                    }}
                    resizeMode='contain'
                  />
                }
              />


              <TouchableOpacity
                onPress={() => {
                  setOpen(true)
                }}
                style={{
                  marginTop: SIZES.radius,
                  flexDirection: "row",
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.lightGray,
                  width: "45%",
                  alignSelf: "center",
                  marginBottom: 10,
                  height: 55,
                  justifyContent: 'space-around',
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                {date_selected != '' ? (
                  <Text
                    style={{
                      fontFamily: 'Janna LT Bold', color: COLORS.grey60,
                      fontSize: 15,
                      // textAlign: "left",

                      ...FONTS.h3,

                      textAlign: 'right',
                    }}
                  >
                    {moment(date_selected).format('DD-MM-YYYY')}
                  </Text>
                ) : (
                  <>


                    <FastImage
                      source={icons.date}
                      style={{
                        width: 25, height: 24, marginRight: SIZES.base,
                        // alignItems:"flex-end"
                      }}
                      resizeMode='contain'
                    />
                    <Text
                      style={{
                        fontFamily: 'Janna LT Bold', color: COLORS.grey60,
                        fontSize: 15,
                        // textAlign: "left",

                        ...FONTS.h3,

                        textAlign: 'right',
                      }}
                    >
                      {'Date'}
                    </Text>
                  </>
                )}
              </TouchableOpacity>


              < DatePicker
                modal
                mode='date'
                open={open}
                date={date}
                minimumDate={date}
                onConfirm={(date) => {
                  setOpen(false)
                  setDate(date)
                  setdate_selected(date)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >


              <TouchableOpacity
                onPress={() => {
                  search_func()
                }}
                style={{
                  backgroundColor: COLORS.bag10Bg,
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                  width: '50%',
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row"
                }}
              >
                <FastImage
                  source={icons.search}
                  style={{
                    width: 25, height: 24, marginRight: SIZES.base,
                    // alignItems:"flex-end"
                  }}
                  resizeMode='contain'
                />
                <Text
                  style={{
                    fontFamily: 'Janna LT Bold', color: "#fff",
                    fontSize: 15,
                    ...FONTS.h3,
                  }}
                >
                  {'Search'}
                </Text>

              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setopen_search(false)
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.linear,
                  );
                  get_data()
                }}
                style={{
                  backgroundColor: COLORS.bag1Bg,
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                  width: '25%',
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row"
                }}
              >
                <FastImage
                  source={icons.closing}
                  style={{
                    width: 25, height: 24, marginRight: SIZES.base,
                    // alignItems:"flex-end"
                  }}
                  resizeMode='contain'
                />
                <Text
                  style={{
                    fontFamily: 'Janna LT Bold', color: "#fff",
                    fontSize: 15,
                    ...FONTS.h3,
                  }}
                >
                  {'Close'}
                </Text>

              </TouchableOpacity>
            </View>
          </>
        ) :
          <TouchableOpacity
            onPress={() => {
              setopen_search(true)
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.linear,
              );
            }}
            style={{
              marginTop: SIZES.radius,
              flexDirection: "row",
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray,
              width: "95%",
              alignSelf: "center",

              // height: 55,
              padding: 10,
              // justifyContent: 'space-around',
              marginBottom: open_search ? null : 10,
              alignContent: "center",
              alignItems: "center"
            }}
          >



            <FastImage
              source={icons.search}
              style={{
                width: 25, height: 24, marginRight: SIZES.base,
                // alignItems:"flex-end"
              }}
              resizeMode='contain'
            />
            <Text
              style={{
                fontFamily: 'Janna LT Bold', color: COLORS.grey60,
                fontSize: 15,
                // textAlign: "left",

                ...FONTS.h3,

                textAlign: 'right',
              }}
            >
              {'Search'}
            </Text>

          </TouchableOpacity>
        }
      </View>


      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 5
        }}
      >


        <TouchableOpacity
          style={{
            backgroundColor: COLORS.bag10Bg,
            padding: 10,
            // marginBottom: 10,
            borderRadius: 10,
            width: '50%',
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 10

          }}
        >
          <Text
            style={{
              fontFamily: 'Janna LT Bold', color: "#fff",

              ...FONTS.h3,
              fontSize: 15,
              // marginLeft: 5
              // textAlign: "center"
            }}
          >
            {'Add Trips'}
          </Text>
          <FastImage
            source={icons.charging}
            style={{
              width: 25, height: 24, marginRight: SIZES.base, marginLeft: 5
              // alignItems:"flex-end"
            }}
            resizeMode='contain'
          />


        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Mytrips')
          }}
          style={{
            backgroundColor: COLORS.bag1Bg,
            padding: 10,
            // marginBottom: 10,
            borderRadius: 10,
            // width: '25%',
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 10
          }}
        >

          <Text
            style={{
              fontFamily: 'Janna LT Bold', color: "#fff",

              ...FONTS.h3,
              fontSize: 15,
            }}
          >
            {'My Trips'}
          </Text>

        </TouchableOpacity>
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
                loading...
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
                  No Trips Yet
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
                          style={{

                            width: '100%',
                            marginBottom: 5

                          }}>

                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-around",
                              marginTop: 10,
                              marginBottom: 5
                            }}
                          >

                            <Text
                              style={{
                                fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                                fontSize: 15,
                                textAlign: "left"
                              }}
                            >
                              {item.from_country}
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
                              {item.to_country}
                            </Text>

                          </View>
                          <View
                            style={{
                              // alignSelf: "flex-start",
                              // marginLeft: 15,
                              width: "100%"
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                                fontSize: 15,
                                textAlign: 'left'
                              }}
                            >
                              {/* {"departure date " + item.departure_date} */}
                              {"before " + moment(item.departure_date).locale('en').format('dddd, D MMM YYYY')}

                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: 'space-between',
                              marginTop: 10,
                              marginBottom: 5
                            }}
                          >

                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >

                              <Text
                                style={{
                                  fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                                  fontSize: 15,
                                  textAlign: "left"
                                }}
                              >
                                {item.consumed_weight + ' KG consumed'}
                              </Text>
                              <FastImage
                                source={icons.kgc}
                                style={{
                                  width: 23, height: 18, marginRight: SIZES.base,
                                  // alignItems:"flex-end"
                                }}
                                resizeMode='contain'
                              />
                            </View>

                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >

                              <Text
                                style={{
                                  fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                                  fontSize: 15,
                                  textAlign: "left"
                                }}
                              >
                                {item.total_weight + ' KG Avilable'}
                              </Text>
                              <FastImage
                                source={icons.carton}
                                style={{
                                  width: 20, height: 20, marginRight: SIZES.base,
                                  // alignItems:"flex-end"
                                }}
                                resizeMode='contain'
                              />
                            </View>


                          </View>
                        </View>


                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          // backgroundColor: "red",
                          width: "100%",
                          borderTopWidth: .5,
                          borderColor: "#ddd",
                          alignItems: "center",
                          alignContent: "center"
                        }}
                      >

                        <Text
                          style={{
                            fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                            fontSize: 15,
                            textAlign: "left",
                            marginTop: 5,
                          }}
                        >
                          {item.userData.user_name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            get_data_my_trips(item)
                            setselected_trip(item)
                            // setshipment_modal(true)
                          }}
                          style={{
                            backgroundColor: COLORS.primary,
                            padding: 10,
                            marginTop: 5,
                            borderRadius: 10
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: 'Janna LT Bold', color: "#fff",
                              fontSize: 15,

                            }}
                          >
                            {'SEND REQUEST'}
                          </Text>

                        </TouchableOpacity>

                      </View>


                    </View>

                  )
                }}
              />
            )}
          </>
        )
      }




      <Modal
        visible={shipment_modal}
        // visible={true}

        onRequestClose={() => {
          setshipment_modal(false)
        }}
        transparent={true}
        animationType='slide'
      >
        <View
          style={{
            flex: 1, alignItems: 'center',
            justifyContent: 'center'
          }}>
          <View
            style={{
              width: '90%',
              padding: 10,

              backgroundColor: "#f6f5f1",

              // elevation: 22,
              borderRadius: 15,
              flex: 1 / 1.1,
              elevation: 5


            }}>
            <Text
              style={{
                fontFamily: 'Janna LT Bold',
                color: "#9F9FA0",
                fontSize: 25,
                textAlign: 'center',
                ...SIZES.h2,
              }}
            >
              {'My Shipments'}
            </Text>
            <Text
              style={{
                fontFamily: 'Janna LT Bold',
                color: "#9F9FA0",
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5
              }}
            >
              {'(choice from your shipment)'}
            </Text>

            {
              loading_trips ? (
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
                      loading...
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  {mycurrentshipments.length == 0 ? (
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
                      data={mycurrentshipments}
                      numColumns={1}
                      renderItem={({ item, index }) => (

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

                          <TouchableOpacity
                            onPress={() => {
                              order_request(item, index)
                            }}
                            style={{
                              backgroundColor: COLORS.bag10Bg,
                              padding: 5,

                              borderRadius: 10,
                              width: '50%',
                              paddingVertical: 5,
                              alignSelf: "center",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "row"
                            }}
                          >
                            {loading_request[index] ? (
                              <ActivityIndicator />

                            ) : (
                              <Text
                                style={{
                                    fontFamily: 'Janna LT Bold', color: "#fff",
                                    fontSize: 15,
                                    ...FONTS.h3,
                                  }}
                                >
                                  {'Select this ship'}
                                </Text>
                            )}


                          </TouchableOpacity>



                        </View>





                      )}
                    />
                  )}
                </>
              )
            }


            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 7,
              }}>
              <TouchableOpacity
                style={{ alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {

                  setshipment_modal(false)
                }}>
                <Text
                  style={{
                    fontFamily: 'Janna LT Bold',
                    color: '#f00',
                    fontSize: 20,
                  }}>
                  إلغاء
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


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
export default Trips;
