import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Zocial';
import { useDispatch, useSelector } from 'react-redux';
import { DUMMY_DATA } from '../constants';
import { emptyCart } from '../redux/actions/cart';
const { width } = Dimensions.get("window");

const Cart = ({ isCartOpen, changeLayoutHeightAndToggleCart, widthVal, navigateToChild }) => {

    const cart = useSelector(state => state.cartReducer.cart);
    const dispatch = useDispatch();

    const emptyCartList = () => {
        dispatch(emptyCart());
    }

    //Render Open Cart Component
    const ActionCart = () => {
        
        return (
            <View>
                <TouchableOpacity 
                    style={{paddingVertical: 10, paddingHorizontal: 20}}
                    onPress={() => changeLayoutHeightAndToggleCart()}>
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
                </TouchableOpacity >
                <View
                    style={{backgroundColor: "#f5f5f5"}}>
                    <ScrollView>
                        <View style={styles.itemsStyleContainer}>
                            {
                                cart.map((val, ind) => <TouchableOpacity key={ind}
                                    activeOpacity={1}
                                    onPress={() => navigateToChild(ind)}>
                                    <Image source={val.img} style={styles.smallImage} resizeMode="contain" />
                                    <Text style={{textAlign: "center"}}>{val.qty}</Text>
                                </TouchableOpacity>)
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }

    //Render Close Cart Component
    const ClosedCart = () => {
        return (
                <TouchableOpacity onPress={() => changeLayoutHeightAndToggleCart()}
                    style={{}}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: 30, height: 30, margin: 5 }}>
                            <Icon name="cart" size={30} color="white" />
                            {
                                (cart.length || 0 ) > 0 && 
                                <View style={styles.cartBadge}>
                                    <Text style={{ color: "white" }}>{cart.length || 0}</Text>
                                </View>
                            }

                        </View>
                    </View>
                </TouchableOpacity>
        );
    }

    const Header = () => {

        const widthAnimation = widthVal.interpolate({
            inputRange: [0, 1],
            outputRange: [250, width]
        })

        const borderAnimation = widthVal.interpolate({
            inputRange: [0, 1],
            outputRange: [250, 0]
        })

        return (
            <Animated.View
                style={[styles.cartClosedContainer, 
                {width: widthAnimation, borderTopLeftRadius: borderAnimation, borderTopRightRadius: borderAnimation}]}>
                {isCartOpen ? 
                    <ActionCart /> : <ClosedCart />
                }
            </Animated.View>
        );
    }

    return (
        <Header />
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
        height: 80,
        width: 80,
        marginVertical: 10
    }
})

export default Cart;