import {
    increase,
    decrease,
    removeFromCart,
} from '@/contexts/cart/actions';

export default function CartItemCard({ cartItem, dispatch, cart }) {
    const { _id, item, qtyForSale } = cartItem;

    return (
        <li>
            {`NAME: ${item} QTY: ${qtyForSale}`}{' '}
            <button onClick={() => dispatch(increase(_id, cart))}>+</button>
            {qtyForSale > 1 && (
                <button onClick={() => dispatch(decrease(_id, cart))}>-</button>
            )}
            {qtyForSale === 1 && (
                <button onClick={() => dispatch(removeFromCart(_id, cart))}>
                    Удалить
                </button>
            )}
        </li>
    );
}
