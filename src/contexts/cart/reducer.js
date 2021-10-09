import { actions } from './actions'; // state changer types

// pure reducers (just return data structure)
// all logic placed in actions
const CartReducer = (state, action) => {
    switch (action.type) {
        case actions.ADD_ITEM:
            console.log(state);
            console.log(action);
            return {
                ...state,
                cart: action.payload,
            };
        case actions.REMOVE_ITEM:
            return {
                ...state,
                cart: action.payload,
            };
        case actions.UPDATE_ITEM:
            return {
                ...state,
                cart: action.payload,
            };
        default:
            throw new Error('No action specified.');
    }
};

export default CartReducer;
