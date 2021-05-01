import React, { Fragment, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, PanResponder } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ITEM_SIZE } from '../constants'

const FlatListItem = ({ scrollX, item, index, addToCart, removeFromCart, qty, len, changeLayoutHeightAndToggleCart }) => {

    const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const [isActionsPresent, setIsActionsPresent] = useState(true);

    const pan = PanResponder.create({
        // onMoveShouldSetPanResponder: () => true,
        // onPanResponderStart: () => {
        //     setIsActionsPresent(false)
        // },
        // onPanResponderMove: (event, gestureState) => {
        //     Animated.event([{dx: position.x, dy: position.y}], {
        //         useNativeDriver: false
        //     })({dx: gestureState.x0, dy: gestureState.y0})
        // },
        // // onPanResponderMove: Animated.event([
        // //         null,
        // //         {dx: position.x, dy: position.y },
        // //     ], {useNativeDriver: false}),
        // onPanResponderEnd: () => {
        //     Animated.spring(position, {
        //         toValue: {x: 0, y: 0},
        //         useNativeDriver: false
        //     }).start();
        // },
        // onPanResponderRelease: () => {
        //     let yPos = position.y._value;
            
        //     if (yPos > 35) {
        //         addToCart(item);
        //         setIsActionsPresent(true);
        //         changeLayoutHeightAndToggleCart(false);
        //     }
        // }
        // Ask to be the responder:
        onPanResponderStart: () => { setIsActionsPresent(false) },
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            if (gesture?.moveX > gesture?.moveY) {
                return false;
              }
              return true;
        },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: Animated.event([
                null,
                {dx: position.x, dy: position.y },
            ], {useNativeDriver: false, listener: (event) => {
                let yPos = position.y._value;
                if (yPos > 35) {
                    changeLayoutHeightAndToggleCart(false);
                }
            }}),
        onPanResponderTerminationRequest: (evt, gestureState) => false,
        onPanResponderRelease: (evt, gestureState) => {
            Animated.spring(position, {
                toValue: {x: 0, y: 0},
                useNativeDriver: false
            }).start();

            let yPos = position.y._value;
            if (yPos > 35) {
                addToCart(item);
                setIsActionsPresent(true);
                changeLayoutHeightAndToggleCart(false);
            }
        },
        onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
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
        outputRange: [0.3, 1, 0.4],
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

    const translateX = scrollX.interpolate({
        inputRange,
        //outputRange: [30, 0, 0]
        outputRange: [0, 0, 0]
    })


    return (
        <Fragment>

            {index === 0 && 
                <View style={{ width: ITEM_SIZE }}></View>
            }

            <View style={{ width: ITEM_SIZE }}>
                
                {/* <Animated.View style={[styles.itemContainer, {opacity: priceOpacity}]}>
                    <Text style={styles.price}>מחיר מבצע</Text>
                    <Text style={styles.price}>{`${item.price} ₪`}</Text>
                </Animated.View> */}

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
                            style={[styles.container, { opacity, transform: [{translateX}] }]}>
                            <View style={styles.imgContainer, {}}>
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