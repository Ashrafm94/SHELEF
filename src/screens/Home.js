import React, { useRef, useState } from 'react';
import { View, SafeAreaView, Animated, Easing, Dimensions } from 'react-native';
import Cart from '../components/Cart';
import FlatListComponent from '../components/FlatListComponent';
import { DUMMY_DATA } from '../constants';

const { width, height } = Dimensions.get("window");

const Home = () => {


    const translateY = useRef(new Animated.Value(-20)).current;
    const widthAnimated = useRef(new Animated.Value(220)).current;
    const borderTop = useRef(new Animated.Value(250)).current;
    const translateYText = useRef(new Animated.Value(70)).current;







    const [isCartOpen, setCartOpen] = useState(false);
    const cartPosition = useRef(new Animated.ValueXY({ x: 0, y: 40 })).current;
    const sectionPosition = useRef(new Animated.ValueXY({ x: 0, y: height - 50 })).current;
    const widthVal = useRef(new Animated.Value(0)).current;
    const [flatRef, setFlatRef] = useState(null);

    const changeLayoutHeightAndToggleCart = (isToggleClose = true) => {

        if (isToggleClose === false && isCartOpen) return;
        setIsCartOpen(isCartOpen);
        // let newCarouselVal = isCartOpen ? 40 : 250;

        // animateWidth();
        // animateCartSection(newCarouselVal);
        // animateCarouselSection(newCarouselVal);

        // setTimeout(() => {
        //     setCartOpen(!isCartOpen);
        // }, 700);
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
            toValue: { x: 0, y: val },
            duration: 500,
            useNativeDriver: false,
            easing: Easing.linear,
            delay: 100
        }).start();
    }

    const animateCarouselSection = (val) => {
        Animated.timing(sectionPosition, {
            toValue: { x: 0, y: height - val - 50 },
            duration: 500,
            useNativeDriver: false,
            easing: Easing.linear,
            delay: 100
        }).start();
    }

    const navigateToChild = (id) => {
        let index = getIndexOfChild(id);
        if (index !== -1){
            flatRef.scrollToIndex({ animated: true, index })
        }
    }

    const getIndexOfChild = (id) => {
        for (let i = 0; i < DUMMY_DATA.length; i++) {
            if (DUMMY_DATA[i].id === id) {
                return i;
            }
        }

        return -1;
    }

    const setRef = (ref) => {
        setFlatRef(ref);
    }

    const setIsCartOpen = (isOpen) => {

        let translateVal = isOpen ? -20 : -190;
        let widthVal = isOpen ? 220 : width;
        let borderVal = isOpen ? 250 : 0;
        let newCarouselVal = isOpen ? 40 : 250;
        let newTranslateYTextVal = isOpen ? 70 : 30;

        setCartOpen(!isOpen);

        Animated.parallel([
            Animated.timing(translateY, {
                toValue: translateVal,
                duration: 300,
                useNativeDriver: false,
                delay: 200
            }),
            Animated.timing(widthAnimated, {
                toValue: widthVal,
                duration: 300,
                useNativeDriver: false,
                delay: 200
            }),
            Animated.timing(borderTop, {
                toValue: borderVal,
                duration: 300,
                useNativeDriver: false,
                delay: 200
            }),
            Animated.timing(sectionPosition, {
                toValue: { x: 0, y: height - newCarouselVal - 50 },
                duration: 500,
                useNativeDriver: false,
                easing: Easing.linear,
                delay: 100
            }),
            Animated.timing(translateYText, {
                toValue: newTranslateYTextVal,
                duration: 500,
                useNativeDriver: false,
                delay: 100
            })
        ]).start()
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <View style={{ flex: 1 }}>
                <Animated.View style={{
                    height: sectionPosition.y
                }}>
                    <FlatListComponent setRef={setRef} translateY={translateYText}
                    changeLayoutHeightAndToggleCart={changeLayoutHeightAndToggleCart} />
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
                    <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}
                        changeLayoutHeightAndToggleCart={changeLayoutHeightAndToggleCart}
                        widthVal={widthVal} navigateToChild={navigateToChild}
                        translateY={translateY} widthAnimated={widthAnimated} borderTop={borderTop} />
                </Animated.View>
            </View>

            {/* <View style={{ flex: 1 }}>
                <Animated.View style={{
                    height: sectionPosition.y
                }}>
                    <FlatListComponent setRef={setRef} changeLayoutHeightAndToggleCart={changeLayoutHeightAndToggleCart} />
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
            </View> */}
        </SafeAreaView>
    );
}

export default Home;