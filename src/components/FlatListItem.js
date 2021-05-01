import React, { Fragment, useRef, useState } from 'react';
import { Dimensions, View, Text, TouchableOpacity, Animated, Image, StyleSheet, PanResponder } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ITEM_SIZE } from '../constants'

const {width} = Dimensions.get("window");

const FlatListItem = ({ scrollX, item, index, addToCart, removeFromCart, qty, len, navigateToChild }) => {

    const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const [isActionsPresent, setIsActionsPresent] = useState(true);

    const pan = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderStart: () => {
            setIsActionsPresent(false)
            console.log("index: ", index)
        },
        onPanResponderMove: Animated.event([
            null,
            {dx: position.x, dy: position.y },
        ], {useNativeDriver: false}),
        onPanResponderEnd: () => {
            Animated.spring(position, {
                toValue: {x: 0, y: 0},
                useNativeDriver: false
            }).start();
        },
        onPanResponderRelease: () => {
            let yPos = position.y._value;
            
            if (yPos > 35) {
                addToCart(item);
                setIsActionsPresent(true);
            }
        }
    })

    const inputRange = [(index - 1) * ITEM_SIZE,
    index * ITEM_SIZE,
    (index + 1) * ITEM_SIZE
    ];

    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.7, 1.2, 0.7],
        extrapolate: "clamp"
    });

    const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5],
        extrapolate: "clamp"
    });

    const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [10, 0, 10],
        extrapolate: "clamp"
    });

    const priceOpacity = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
        extrapolate: "clamp"
    });

    return (
        <Fragment>

            {index === 0 && 
                <View style={{ width: ITEM_SIZE }}></View>
            }

            <View style={{ width: ITEM_SIZE }}>

                <Animated.View style={[styles.itemContainer, {opacity: priceOpacity}]}>
                    <Text style={styles.price}>מחיר מבצע</Text>
                    <Text style={styles.price}>{`${item.price} ₪`}</Text>
                </Animated.View>

                <Animated.View
                    {...pan.panHandlers}
                    style={{
                        transform: [
                            {translateX: position.x},
                            {translateY: position.y}
                        ]
                    }}>
                    <TouchableOpacity onPress={() => addToCart(item)} activeOpacity={1}
                        >
                        <Animated.View
                            style={[styles.container, { opacity }]}>
                            <View style={styles.imgContainer}>
                                <Animated.Image source={item.img} style={[styles.img, {
                                    transform: [
                                        {scale},
                                        {translateY}
                                    ]
                                }]} resizeMode="contain" />
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
                
                {
                    (isActionsPresent && qty > 0) && 
                    <Animated.View style={[styles.actionsContainer, {opacity: priceOpacity}]}>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => addToCart(item)} style={styles.icons}><FontAwesome5 color="black" size={40} name="plus"/></TouchableOpacity>
                            <Text style={styles.qty}>{qty}</Text>
                            <TouchableOpacity onPress={() => removeFromCart(item)} style={styles.icons}><FontAwesome5 color="black" size={40} name="minus"/></TouchableOpacity>
                        </View>
                    </Animated.View>
                }
            </View>
            {index === len - 1 && 
                <View style={{ width: ITEM_SIZE }}></View>
            }

        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    imgContainer: {
        zIndex: 5
    },
    img: {
        height: 200,
        marginHorizontal: 10,
    },
    price: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25
    },
    actionsContainer: {
        position: "absolute",
        top: "50%",
        left: 0,
        width: ITEM_SIZE
    },
    actions: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    icons: {
        marginHorizontal: 15
    },
    qty: {
        fontSize: 70,
        color: "white",
        textAlign: "center"
    }
});

export default FlatListItem;