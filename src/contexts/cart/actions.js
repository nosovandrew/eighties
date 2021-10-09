// state changers (actions) list

export const actions = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_ITEM: 'UPDATE_ITEM',
};

// state changers (actions) logic

// increase qtyForSale of product in cart
export const increase = (productId, cart) => {
    // args: productId (id of product), cart (existing cart in local state)
    const { items } = cart; // get specific field from cart obj
    const updatedItems = [...items]; // copy items array
    // qty + 1 for the desired product
    updatedItems.forEach((item) => {
        if (item._id === productId) item.qtyForSale += 1;
    });

    return generateActionResult(actions.UPDATE_ITEM, updatedItems, cart);
};

// decrease qtyForSale of product in cart
export const decrease = (productId, cart) => {
    // args: productId (id of product), cart (existing cart in local state)
    const { items } = cart; // get specific field from cart obj
    const updatedItems = [...items]; // copy items array
    // qty - 1 for the desired product
    updatedItems.forEach((item) => {
        if (item._id === productId) item.qtyForSale -= 1;
    });

    return generateActionResult(actions.UPDATE_ITEM, updatedItems, cart);
};

// add new product to cart (or increase qtyForSale of existed product)
export const addToCart = (product, cart) => {
    // args: product (new product for adding), cart (existing cart in local state)
    const { items } = cart; // get specific field from cart obj
    // check whether product already exist in cart
    if (items.every((item) => item._id !== product._id)) {
        // product is new -> just add new item with minimal qty
        const updatedItems = [...items, { ...product, qtyForSale: 1 }]; // updated items field [new item]

        return generateActionResult(actions.ADD_ITEM, updatedItems, cart);
    } else {
        // product already exist -> increase qty
        return increase(product._id, cart);
    }
};

// remove product from cart
export const removeFromCart = (productId, cart) => {
    // args: productId (id of deleting product), cart (existing cart in local state)
    const { items } = cart; // get specific field from cart obj
    const updatedItems = items.filter((item) => item._id !== productId); // remove product from cart items

    return generateActionResult(actions.REMOVE_ITEM, updatedItems, cart);
};

// state changers (actions) helpers

// calc total price of current cart
const calculateTotal = (items) =>
    // args: items (current cart items for calc tital price)
    items.reduce((total, item) => total + item.qtyForSale * item.price.base, 0);

// common result for action (return)
const generateActionResult = (type, updatedItems, cart) => {
    // args: type (type of state changer `str`), updatedItems (result of actions work), cart (whole cart state)
    return {
        type: type,
        payload: {
            ...cart, // rest of cart state (other fields)
            items: updatedItems,
            total: calculateTotal(updatedItems),
        }
    };
};
