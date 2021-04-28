import React, { useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import FlatListItem from './FlatListItem';
import { useDispatch, useSelector } from 'react-redux';
import { DUMMY_DATA } from '../constants';
import { addItem, modifyItem } from '../redux/actions/cart';

const { width } = Dimensions.get("window");

const FlatListComponent = () => {

    const scrollX = useRef(new Animated.Value(0)).current;
    const cart = useSelector(state => state.cartReducer.cart);
    const dispatch = useDispatch();

    //TODO: INCOMPLETE
    const addToCart = (item) => {
        //IF ITEM EXIST
        //INCRESE THE AMOUTN
        //OTHERWISE
        //ADD IT

        let itemExist = cart.filter((val) => val.id === item.id);

        //Item Exist
        if (itemExist.length > 0) {
            dispatch(modifyItem(item));
        } else {
            //Add New Item
            dispatch(addItem(item));
        }
    }

    return (
        <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={DUMMY_DATA}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            snapToInterval={width}
            decelerationRate={0}
            bounces={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}
            contentContainerStyle={{
                alignItems: "center"
            }}
            renderItem={({ item, index }) => (
                <FlatListItem item={item} index={index} scrollX={scrollX} addToCart={addToCart} />
            )}
        />
    );
}

export default FlatListComponent;