import { actions } from './actions'; // state changer types

// pure reducers (just return data structure)
// all logic placed in actions
const CartReducer = (state, action) => {
    switch (action.type) {
        case actions.ADD_TO_CART:
            return {
                ...state,
                cart: action.payload,
            };
        case actions.REMOVE_FROM_CART:
            return {
                ...state,
                cart: action.payload,
            };
        case actions.INCREASE:
            return {
                ...state,
                cart: action.payload,
            };
        case actions.DECREASE:
            return {
                ...state,
                cart: action.payload,
            };
        default:
            throw new Error("No action specified.");
    }
};

export default CartReducer;
