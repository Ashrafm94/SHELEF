import React, { useRef } from 'react';
import {Animated } from 'react-native';
import FlatListItem from './FlatListItem';
import { useDispatch, useSelector } from 'react-redux';
import { DUMMY_DATA, ITEM_SIZE } from '../constants';
import { addItem, modifyItem, removeItem } from '../redux/actions/cart';

const FlatListComponent = ({ setRef, navigateToChild }) => {

    const scrollX = useRef(new Animated.Value(0)).current;
    const cart = useSelector(state => state.cartReducer.cart);
    const dispatch = useDispatch();

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
            <Animated.FlatList
                ref={(ref) => {setRef(ref)}}
                showsHorizontalScrollIndicator={false}
                data={DUMMY_DATA}
                keyExtractor={(item) => `${item.id}`}
                horizontal
                snapToInterval={ITEM_SIZE}
                decelerationRate="normal"
                bounces={false}
                scrollEventThrottle={16}
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                contentContainerStyle={{
                    alignItems: "center"
                }}
                renderItem={({ item, index }) => (
                    <FlatListItem item={item} index={index} scrollX={scrollX} 
                        addToCart={addToCart} removeFromCart={removeFromCart}
                        qty={getQty(item)} len={DUMMY_DATA.length}
                        navigateToChild={navigateToChild} />
                )}
            />
    );
}

export default FlatListComponent;