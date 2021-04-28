import React, { useRef, useState } from 'react';
import { View, SafeAreaView, Animated } from 'react-native';
import Cart from '../components/Cart';
import FlatListComponent from '../components/FlatListComponent';

const CART_OPEN_FLEX = 2, CART_CLOSED_FLEX = 0.5, CART_SMALL_OPEN = 1;


const Home = () => {

    const [isCartOpen, setCartOpen] = useState(false);
    const flexAnimatedVal = useRef(new Animated.Value(CART_CLOSED_FLEX)).current;

    const changeLayoutHeightAndToggleCart = () => {

        let newVal = isCartOpen ? CART_CLOSED_FLEX : CART_OPEN_FLEX;
        let timeOut = isCartOpen ? 490 : 1;

        setTimeout(() => {
            setCartOpen(!isCartOpen);
        }, timeOut);

        animateCartSection(newVal);
    }

    const animateCartSection = (val) => {
        Animated.timing(flexAnimatedVal, {
            toValue: val,
            duration: 500,
            useNativeDriver: false
        }).start();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>

                <Animated.View style={{
                    flex: 3
                }}>
                    <FlatListComponent />
                </Animated.View>
                <Animated.View style={{
                    flex: flexAnimatedVal,
                    alignItems: "center",
                    justifyContent: "flex-end"
                }}>
                    <Cart isCartOpen={isCartOpen} changeLayoutHeightAndToggleCart={changeLayoutHeightAndToggleCart} />
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

export default Home;