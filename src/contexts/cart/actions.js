// action changers list
export const actions = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    INCREASE: 'INCREASE',
    DECREASE: 'DECREASE',
};

// action changers logic
// increase qtyForSale of product in cart
export const increase = (productId, cart) => {
    // args: productId (id of product), cart (existing cart in local state)
    const { items } = cart; // get specific field from cart obj
    const newItems = [...items]; // copy items array
    // qty + 1 for the desired product
    newItems.forEach((item) => {
        if (item._id === productId) item.qtyForSale += 1;
    });

    return {
        type: 'INCREASE',
        payload: {
            ...cart,
            items: newItems,
        },
    };
};

// decrease qtyForSale of product in cart
export const decrease = (productId, cart) => {
    // args: productId (id of product), cart (existing cart in local state)
    const { items } = cart; // get specific field from cart obj
    const newItems = [...items]; // copy items array
    // qty - 1 for the desired product
    newItems.forEach((item) => {
        if (item._id === productId) item.qtyForSale -= 1;
    });

    return {
        type: 'DECREASE',
        payload: {
            ...cart,
            items: newItems,
        },
    };
};

// add new product to cart (or increase qtyForSale of existed product)
export const addToCart = (product, cart) => {
    // args: product (new product for adding), cart (existing cart in local state)
    const { items } = cart; // get specific field from cart obj
    // check whether product already exist in cart
    if (items.every((item) => item._id !== product._id)) {
        // product is new -> just add new item with minimal qty
        return {
            type: 'ADD_TO_CART',
            payload: {
                ...cart, // rest of state (other fields)
                items: [...items, { ...product, qtyForSale: 1 }], // updated items field [new item]
            },
        };
    } else {
        // <<< should I use decrease func here ??? >>>
        // product already exist -> increase qty
        const updatedItems = [...items];
        updatedItems.forEach((item) => {
            if (item._id === product._id) item.qtyForSale += 1;
        });
        return { type: 'ADD_TO_CART', payload: {
            ...cart,
            items: updatedItems,
        } };
    }
};

// remove product from cart
export const removeFromCart = (productId, cart) => {
    // args: productId (id of deleting product), cart (existing cart in local state)
    const { items } = cart; // get specific field from cart obj
    const updatedItems = items.filter((item) => item._id !== productId); // remove product from cart items
    return {
        type: 'REMOVE_FROM_CART',
        payload: {
            ...cart,
            items: updatedItems,
        },
    };
};
