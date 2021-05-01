import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Zocial';
import { useDispatch, useSelector } from 'react-redux';
import { DUMMY_DATA } from '../constants';
import { emptyCart } from '../redux/actions/cart';
import SingleCartItem from './SingleCartItem';
const { width } = Dimensions.get("window");

const Cart = ({ isCartOpen, setIsCartOpen, changeLayoutHeightAndToggleCart, widthVal, navigateToChild, translateY, widthAnimated, borderTop }) => {

    const cart = useSelector(state => state.cartReducer.cart);
    const dispatch = useDispatch();

    const emptyCartList = () => {
        dispatch(emptyCart());
    }

    // //Render Open Cart Component
    // const ActionCart = () => {

    //     return (
    //         <View>
    //             <TouchableOpacity
    //                 style={{ paddingVertical: 10, paddingHorizontal: 20 }}
    //                 onPress={() => changeLayoutHeightAndToggleCart()}>
    //                 <View style={styles.openCartContainer}>
    //                     <View style={{ justifyContent: "center", alignItems: "center" }}>
    //                         <FontAwesome5 name="chevron-down" size={20} color="white" />
    //                         <Text style={{ color: "white" }}>סגירה</Text>
    //                     </View>
    //                     <View><Text style={{ color: "white", fontSize: 16 }}>{cart.length || 0} פרטים</Text></View>
    //                     <TouchableOpacity onPress={() => emptyCartList()} style={{ justifyContent: "center", alignItems: "center" }}>
    //                         <FontAwesome5 name="trash" size={20} color="white" />
    //                         <Text style={{ color: "white" }}>מחיקה</Text>
    //                     </TouchableOpacity>
    //                 </View>
    //             </TouchableOpacity >
    //             <View
    //                 style={{ backgroundColor: "#f5f5f5" }}>
    //                 <ScrollView>
    //                     <View style={styles.itemsStyleContainer}>
    //                         {
    //                             cart.map((val, ind) => <TouchableOpacity key={ind}
    //                                 activeOpacity={1}
    //                                 onPress={() => navigateToChild(val.id)}>
    //                                 <Image source={val.img} style={styles.smallImage} resizeMode="contain" />
    //                                 <Text style={{ textAlign: "center" }}>{val.qty}</Text>
    //                             </TouchableOpacity>)
    //                         }
    //                     </View>
    //                 </ScrollView>
    //             </View>
    //         </View>
    //     );
    // }

    // //Render Close Cart Component
    // const ClosedCart = () => {
    //     return (
    //         <TouchableOpacity onPress={() => changeLayoutHeightAndToggleCart()}
    //             style={{}}>
    //             <View style={{ justifyContent: "center", alignItems: "center" }}>
    //                 <View style={{ width: 30, height: 30, margin: 5 }}>
    //                     <Icon name="cart" size={30} color="white" />
    //                     {
    //                         (cart.length || 0) > 0 &&
    //                         <View style={styles.cartBadge}>
    //                             <Text style={{ color: "white" }}>{cart.length || 0}</Text>
    //                         </View>
    //                     }

    //                 </View>
    //             </View>
    //         </TouchableOpacity>
    //     );
    // }

    // const Header = () => {

    //     const widthAnimation = widthVal.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [250, width]
    //     })

    //     const borderAnimation = widthVal.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [250, 0]
    //     })

    //     return (
    //         <Animated.View
    //             style={[styles.cartClosedContainer,
    //             { width: widthAnimation, borderTopLeftRadius: borderAnimation, borderTopRightRadius: borderAnimation }]}>
    //             {isCartOpen ?
    //                 <ActionCart /> : <ClosedCart />
    //             }
    //         </Animated.View>
    //     );
    // }

    

    // const translateY = useRef(new Animated.Value(-20)).current;
    // const widthAnimated = useRef(new Animated.Value(220)).current;
    // const borderTop = useRef(new Animated.Value(250)).current;

    const openCloseCart = () => {

        setIsCartOpen(isCartOpen);

        // let translateVal = isCartOpen ? -20 : -190;
        // let widthVal = isCartOpen ? 220 : width;
        // let borderVal = isCartOpen ? 250 : 0;


        // setIsCartOpen(!isCartOpen);

        // Animated.parallel([
        //     Animated.timing(translateY, {
        //         toValue: translateVal,
        //         duration: 300,
        //         useNativeDriver: false,
        //         delay: 200
        //     }),
        //     Animated.timing(widthAnimated, {
        //         toValue: widthVal,
        //         duration: 300,
        //         useNativeDriver: false,
        //         delay: 200
        //     }),
        //     Animated.timing(borderTop, {
        //         toValue: borderVal,
        //         duration: 300,
        //         useNativeDriver: false,
        //         delay: 200
        //     })
        // ]).start()
    }

    const CartHeader = () => {

        return (
            <Animated.View style={{
                height: 60,
                width: widthAnimated,
                backgroundColor: "red",
                borderTopLeftRadius: borderTop,
                borderTopRightRadius: borderTop
            }}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ paddingVertical: 10, paddingHorizontal: 20 }}
                    //onPress={() => changeLayoutHeightAndToggleCart()}>
                    onPress={() => openCloseCart()}>
                    {
                        isCartOpen ?
                            <View style={styles.openCartContainer}>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <FontAwesome5 name="chevron-down" size={20} color="white" />
                                    <Text style={{ color: "white" }}>סגירה</Text>
                                </View>
                                <View><Text style={{ color: "white", fontSize: 16 }}>{cart.length || 0} פרטים</Text></View>
                                <TouchableOpacity onPress={() => emptyCartList()} style={{ justifyContent: "center", alignItems: "center" }}>
                                    <FontAwesome5 name="trash" size={20} color="white" />
                                    <Text style={{ color: "white" }}>מחיקה</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <View style={{ width: 30, height: 30, margin: 5 }}>
                                    <Icon name="cart" size={30} color="white" />
                                    {
                                        (cart.length || 0) > 0 &&
                                        <View style={styles.cartBadge}>
                                            <Text style={{ color: "white" }}>{cart.length || 0}</Text>
                                        </View>
                                    }

                                </View>
                            </View>
                    }

                </TouchableOpacity>
            </Animated.View>
        )
    }

    const CartItems = () => {
        return (
            <View
                style={{ backgroundColor: "#f5f5f5", flex: 1 }}>
                <ScrollView contentContainerStyle={{
                    paddingBottom: 100
                }}>
                    <View style={styles.itemsStyleContainer}>
                        {
                            cart.map((val, ind) => <SingleCartItem navigateToChild={navigateToChild} key={ind} val={val} />)
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }

    const CustomCart = () => {
        return (
            <Animated.View style={{ height: 300, transform: [{ translateY }] }}>
                {/* Cart Header */}
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <CartHeader />
                </View>

                {/* Cart Items */}
                <CartItems />
            </Animated.View>
        )
    }

    return (
        //<Header />
        <CustomCart />
    )


}

const styles = StyleSheet.create({
    cartBadge: {
        position: "absolute",
        top: -5,
        right: -6
    },
    cartClosedContainer: {
        backgroundColor: "red",
        width: 250,
        borderTopLeftRadius: 250,
        borderTopRightRadius: 250,
    },
    openCartHeader: {
        width,
        backgroundColor: "red",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    openCartContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemsStyleContainer: {
        flexDirection: "row-reverse",
        marginVertical: 10,
        flexWrap: "wrap"
    },
    smallImage: {
        height: 65,
        width: 65,
        marginVertical: 10
    }
})

export default Cart;