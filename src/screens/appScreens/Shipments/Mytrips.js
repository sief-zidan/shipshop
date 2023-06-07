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
const Mytrips = ({ navigation }) => {

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
    const [loading, setloading] = useState(false)


    useEffect(() => {
        get_data()
    }, []);

    async function get_data() {
        setloading(true)

        let data_send = {
            user_id: userData.user_id,
            // user_id: 1,
            to_country: 'all',
            from_country: 'all',
        }
        // console.log(JSON.stringify(data_send))


        axios.post('https://camp-coding.tech/ship_shop/user/home/select_my_trips.php', data_send).then(res => {
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

                        }}>My trips</Text>
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
                                loading ...
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
                                    No trips yet
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
                                                            {/* {"before " + item.departure_date} */}
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
export default Mytrips;
