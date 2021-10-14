import { useContext } from 'react';

import { CartContext } from '@/contexts/cart/context';
import {
    increase,
    decrease,
    removeFromCart,
} from '@/contexts/cart/actions';

export default function Cart() {
    const { state, dispatch } = useContext(CartContext);
    const { cart } = state; // get cart item from state

    return (
        <>
            <h1>Корзина</h1>
            <ul>
                {cart.items.length === 0 ? (
                    <p>Корзина пуста..</p>
                ) : (
                    cart.items.map((_item) => {
                        const { _id, item, qtyForSale } = _item;

                        return (
                            <li key={_id}>
                                {`NAME: ${item} QTY: ${qtyForSale}`}{' '}
                                <button
                                    onClick={() =>
                                        dispatch(increase(_id, cart))
                                    }
                                >
                                    +
                                </button>
                                {qtyForSale > 1 && (
                                    <button
                                        onClick={() =>
                                            dispatch(decrease(_id, cart))
                                        }
                                    >
                                        -
                                    </button>
                                )}
                                {qtyForSale === 1 && (
                                    <button
                                        onClick={() =>
                                            dispatch(removeFromCart(_id, cart))
                                        }
                                    >
                                        Удалить
                                    </button>
                                )}
                            </li>
                        );
                    })
                )}
            </ul>
        </>
    );
}
