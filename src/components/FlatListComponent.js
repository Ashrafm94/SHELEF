import React, { Fragment, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import FlatListItem from './FlatListItem';
import { useDispatch, useSelector } from 'react-redux';
import { DUMMY_DATA, ITEM_SIZE } from '../constants';
import { addItem, modifyItem, removeItem } from '../redux/actions/cart';

const FlatListComponent = ({ setRef, changeLayoutHeightAndToggleCart, translateY }) => {

    const scrollX = useRef(new Animated.Value(0)).current;
    const cart = useSelector(state => state.cartReducer.cart);
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0);

    const getItemFromCart = (item) => {
        let itemArray = cart.filter((val) => val.id === item.id);
        return itemArray.length === 0 ? null : itemArray[0];
    }

    //Add Item
    const addToCart = (item) => {

        let oldItem = getItemFromCart(item);

        //Item Exist
        if (oldItem) {
            modifyItemInCart({
                ...item,
                qty: oldItem.qty + 1
            });
        } else {
            //Add New Item
            dispatch(addItem({
                ...item,
                qty: 1
            }));
        }
    }

    //Remove Item
    const removeFromCart = (item) => {
        let oldItem = getItemFromCart(item);

        if (oldItem) {
            if (oldItem.qty > 1) {
                modifyItemInCart({
                    ...item,
                    qty: oldItem.qty - 1
                });
            } else {
                dispatch(removeItem(oldItem.id));
            }
        }
    }

    //Modify Item
    const modifyItemInCart = (item) => {
        dispatch(modifyItem(item));
    }

    const getQty = (item) => {
        let oldItem = getItemFromCart(item);
        return oldItem ? oldItem.qty : 0
    }

    return (
        <View style={{ flex: 1 }}>
            <Animated.View style={{ justifyContent: "center", alignItems: "center", transform: [{translateY}] }}>
                {
                    activeIndex !== -1 ?
                        <Fragment>
                            <Text style={styles.price}>מחיר מבצע</Text>
                            <Text style={styles.price}>{`${DUMMY_DATA[activeIndex].price} ₪`}</Text>
                        </Fragment>
                        : null
                }
            </Animated.View>

            <Animated.FlatList
                ref={(ref) => { setRef(ref) }}
                showsHorizontalScrollIndicator={false}
                data={DUMMY_DATA}
                keyExtractor={(item) => `${item.id}`}
                horizontal
                snapToInterval={ITEM_SIZE}
                decelerationRate={0}
                bounces={false}
                scrollEventThrottle={16}
                pagingEnabled
                contentContainerStyle={{
                    alignItems: "center"
                }}
                // onScroll={Animated.event(
                //     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                //     { useNativeDriver: true }
                // )}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: true, listener: (event) => {
                            let contentOffset = event.nativeEvent.contentOffset;
                            let index = Math.floor(contentOffset.x / ITEM_SIZE);
                            setActiveIndex(index)
                        }
                    }
                )
                }
                renderItem={({ item, index }) => (
                    <FlatListItem item={item} index={index} scrollX={scrollX}
                        addToCart={addToCart} removeFromCart={removeFromCart}
                        qty={getQty(item)} len={DUMMY_DATA.length}
                        changeLayoutHeightAndToggleCart={changeLayoutHeightAndToggleCart} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    price: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25
    },
})

export default FlatListComponent;