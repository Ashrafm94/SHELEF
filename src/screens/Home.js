import React, { useRef } from 'react';

import {View, Text, SafeAreaView, FlatList, Image, StyleSheet, Animated, Dimensions, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {DUMMY_DATA, ACTIVE_ITEM_SIZE, IN_ACTIVE_ITEM_SIZE} from '../constants';
import { addItem, modifyItem } from '../redux/actions/cart';

const {width} = Dimensions.get("window");

const Home = () => {

    const scrollX = useRef(new Animated.Value(0)).current;
    const cart = useSelector(state => state.cartReducer.cart);
    const dispatch = useDispatch();

    const FlatListItem = ({item, index}) => {
        
        //const W = width/3;
        const W = width;

        const inputRange = [(index - 1) * W,
            index * W,
            (index + 1) * W
        ];

        //: [(index - 1) * width, index * width, (index + 1) * width],
        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        
        // transform: [{translateX}]

        return (
            <View style={{width: W}}>
                <View>
                    <Text style={styles.price}>{`${item.price} ₪`}</Text>
                </View>
                <TouchableOpacity onPress={() => addToCart(item)} activeOpacity={1}>
                    <Animated.View style={[styles.container, {transform: [{scale}]}]}>
                        <View style={styles.imgContainer}>
                            <Image source={item.img} style={styles.img} resizeMode="contain" />
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        );
    }

    //TODO: INCOMPLETE
    const addToCart = (item) => {
        //IF ITEM EXIST
        //INCRESE THE AMOUTN
        //OTHERWISE
        //ADD IT

        let itemExist = cart.filter((val) => val.id === item.id);

        //Item Exist
        if (itemExist.length > 0) {
            dispatch(modifyItem(item));
        } else {
            //Add New Item
            dispatch(addItem(item));
        }
    }

    return (
        <SafeAreaView>
            <View style={{marginTop: 20}}>
                <Text style={{textAlign: "center", marginBottom: 50}}>
                    Images View
                </Text>

                <Animated.FlatList 
                    showsHorizontalScrollIndicator={false}
                    data={DUMMY_DATA}
                    keyExtractor={(item) => `${item.id}`}
                    horizontal
                    snapToInterval={width}
                    decelerationRate={0}
                    bounces={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: {contentOffset: {x: scrollX}} }],
                        {useNativeDriver: true}
                    )}
                    contentContainerStyle={{
                        alignItems: "center"
                    }}
                    renderItem={({item, index}) => <FlatListItem item={item} index={index} />}
                />

                <View style={{marginTop: 10}}>
                    <Text style={{textAlign: "center"}}>Cart Len: {`${!cart ? "NULL" : cart.length}`}</Text>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 320,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    imgContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        alignSelf: 'center'
    },
    img: {
        height: 200,
        marginHorizontal: 10
    },
    price: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    }
})

export default Home;