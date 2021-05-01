import React, { useRef, useState } from 'react';
import { View, SafeAreaView, Animated, Easing, Dimensions } from 'react-native';
import Cart from '../components/Cart';
import FlatListComponent from '../components/FlatListComponent';

const {height} = Dimensions.get("window");

const Home = () => {

    const [isCartOpen, setCartOpen] = useState(false);
    const cartPosition = useRef(new Animated.ValueXY({x: 0, y: 40})).current;
    const sectionPosition = useRef(new Animated.ValueXY({x: 0, y: height-50})).current;
    const widthVal = useRef(new Animated.Value(0)).current;
    const [flatRef, setFlatRef] = useState(null);

    const changeLayoutHeightAndToggleCart = () => {

        let newCarouselVal = isCartOpen ? 40 : 250;

        animateWidth();
        animateCartSection(newCarouselVal);
        animateCarouselSection(newCarouselVal);

        setTimeout(() => {
            setCartOpen(!isCartOpen);   
        }, 700);
    }

    const animateWidth = () => {
        Animated.timing(widthVal, {
            toValue: isCartOpen ? 0 : 1,
            duration: 400,
            delay: 1000,
            useNativeDriver: false
        }).start()
    }

    const animateCartSection = (val) => {
        // Animated.timing(cartFlex, {
        //     toValue: val,
        //     duration: 500,
        //     useNativeDriver: false,
        //     easing: Easing.linear,
        //     delay: 50
        // }).start();

        Animated.timing(cartPosition, {
            toValue: {x: 0, y: val},
            duration: 500,
            useNativeDriver: false,
            easing: Easing.linear,
            delay: 100
        }).start();
    }

    const animateCarouselSection = (val) => {
        Animated.timing(sectionPosition, {
            toValue: {x: 0, y: height-val-50},
            duration: 500,
            useNativeDriver: false,
            easing: Easing.linear,
            delay: 100
        }).start();
    }

    const navigateToChild = (id) => {
        //In Our case the id represnt index+1
        //So the item will be in "id - 1"
        //And Because we adding new item before the first element
        //so we need to subtract another item in order to get to the attached item
        let index = id - 2;
        flatRef.scrollToIndex({animated: true, index})
    }

    const setRef = (ref) => {
        setFlatRef(ref);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <View style={{ flex: 1 }}>

                <Animated.View style={{
                    height: sectionPosition.y
                }}>
                    <FlatListComponent setRef={setRef} />
                </Animated.View>
                <Animated.View style={{
                    alignItems: "center",
                    justifyContent: "flex-start",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: cartPosition.y
                }}>
                    <Cart isCartOpen={isCartOpen} 
                        changeLayoutHeightAndToggleCart={changeLayoutHeightAndToggleCart}
                        widthVal={widthVal} navigateToChild={navigateToChild} />
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

export default Home;