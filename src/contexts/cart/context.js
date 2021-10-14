import { useEffect, useReducer, createContext } from 'react';

import { actions } from './actions'; // state changer types
import cartReducer from './reducer'; // add state changer logic

export const CartContext = createContext(); // create context for cart

export const CartContextProvider = ({ children }) => {
    // init state of cart for new user
    const initialState = {
        cart: {
            items: [],
            total: 0,
        },
    };
    const [state, dispatch] = useReducer(cartReducer, initialState); // init reducer
    const { cart } = state; // get cart item from state

    // <<< PERSISTENT CART VIA LOCALSTORAGE started >>>
    // all persistant functionality placed in this file and *cart.js*
    // initial getting data from local storage
    useEffect(() => {
        // get cart from LS
        const persistent_cart = JSON.parse(
            localStorage.getItem('__persistent_cart')
        );
        if (persistent_cart) {
            // checking if user change price in localStorage
            // have to check in making order!!!

            dispatch({ type: actions.ADD_ITEM, payload: persistent_cart }); // add cart to app state (if it exists)
        }
    }, []); // [] means that code runs only 1 time for initial stage

    // up to date local storage (updating LS when cart is changed)
    useEffect(() => {
        localStorage.setItem('__persistent_cart', JSON.stringify(cart)); // add cart to LS
    }, [cart]); // [cart] means that code runs when cart is changed
    // <<< PERSISTENT CART ended >>>

    return (
        // wrapper with complex logic with state and its changers (value)
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
