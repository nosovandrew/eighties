import { useReducer, createContext } from 'react';

import cartReducer from './reducer'; // add state changer logic

export const CartContext = createContext(); // create context for cart

export const CartContextProvider = ({ children }) => {
    // init state of cart for new user
    const initialState = {
        cart: {
            items: [],
            total: 0
        },
    }
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        // wrapper with complex logic with state and its changers (value)
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
