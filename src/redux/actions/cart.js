export const ADD_ITEM = "ADD_ITEM";
export const MODIFY_ITEM = "MODIFY_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const EMPTY_CART = "EMPTY_CART";

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        data: {
            item
        }
    }
}

export const modifyItem = (item) => {
    return {
        type: MODIFY_ITEM,
        data: {
            item
        }
    }
}

export const removeItem = (itemId) => {
    return {
        type: REMOVE_ITEM,
        data: {
            itemId
        }
    }
}

export const emptyCart = () => {
    return {
        type: EMPTY_CART
    }
}