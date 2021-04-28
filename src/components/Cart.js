import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Zocial';
import { useSelector } from 'react-redux';
import { DUMMY_DATA } from '../constants';
const { width } = Dimensions.get("window");

const Cart = ({ isCartOpen, changeLayoutHeightAndToggleCart }) => {

    const cart = useSelector(state => state.cartReducer.cart);

    //Render Open Cart Component
    const ActionCart = () => {
        return (
            <View>
                <TouchableOpacity style={styles.openCartHeader}
                    onPress={() => changeLayoutHeightAndToggleCart()}>
                    <View style={styles.openCartContainer}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <FontAwesome5 name="chevron-down" size={20} color="white" />
                            <Text style={{ color: "white" }}>סגירה</Text>
                        </View>
                        <View><Text style={{ color: "white", fontSize: 16 }}>{cart.length || 0} פרטים</Text></View>
                        <View></View>
                    </View>
                </TouchableOpacity >
                <ScrollView>
                    <View style={styles.itemsStyleContainer}>
                        {
                            DUMMY_DATA.map((val, ind) => <View key={ind}>
                                <Image source={val.img} style={styles.smallImage} resizeMode="contain" />
                            </View>)
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }

    //Render Close Cart Component
    const ClosedCart = () => {
        return (
            <TouchableOpacity onPress={() => changeLayoutHeightAndToggleCart()}
                style={styles.cartClosedContainer}>
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

    return (
        isCartOpen ? <ActionCart /> : <ClosedCart />
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
        borderWidth: 2,
        borderColor: 'red'
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
        alignItems: "center"
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