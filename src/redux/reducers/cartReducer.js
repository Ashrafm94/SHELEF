import {ADD_ITEM, MODIFY_ITEM, REMOVE_ITEM, EMPTY_CART} from '../actions/cart';

const initialState = {
    cart: []
};


//cart reducer
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            //adding an item to the cart
            //copy the previous cart and concat with the new item
            return {
                ...state,
                cart: [...state.cart, action.data.item]
            };

        case MODIFY_ITEM:
            //Get Index Of Modified Item and Modify It
            //By copy all data from 0 to index (exclusive)
            //and then add the updated item
            //then add the rest of the array (from index+1)
            let index = state.cart.findIndex((val) => val.id === action.data.item.id);
            return {
                ...state,
                cart: index !== -1 ? [
                    ...state.cart.slice(0, index),
                    action.data.item,
                    ...state.cart.slice(index + 1)
                ] : state.cart
            };

        case REMOVE_ITEM:
            //removing an item from the cart
            return {
                ...state,
                cart: [...state.cart].filter((val) => val.id !== action.data.itemId)
            };

        case EMPTY_CART:
            //empty cart
            return {
                ...state,
                cart: []
            };

        default: 
            //any other cases
            //return the state
            return state;
    }
}

export default cartReducer;