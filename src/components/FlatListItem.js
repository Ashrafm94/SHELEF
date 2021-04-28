import React from 'react';
import { Dimensions, View, Text, TouchableOpacity, Animated, Image, StyleSheet } from 'react-native';

const { width } = Dimensions.get("window");

const FlatListItem = ({ scrollX, item, index, addToCart }) => {
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
        <View style={{ width: W }}>
            <View>
                <Text style={styles.price}>{`${item.price} ₪`}</Text>
            </View>
            <TouchableOpacity onPress={() => addToCart(item)} activeOpacity={1}>
                <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
                    <View style={styles.imgContainer}>
                        <Image source={item.img} style={styles.img} resizeMode="contain" />
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </View>
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
});

export default FlatListItem;