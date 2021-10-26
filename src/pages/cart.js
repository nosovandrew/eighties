import { useContext } from 'react';
import { useRouter } from 'next/router';

import Layout from '@/components/templates/layout';
import CartItemCard from '@/components/molecules/cartItemCard';
import { CartContext } from '@/contexts/cart/context';

export default function Cart() {
    const router = useRouter(); // for redirecting to order page
    const { state, dispatch } = useContext(CartContext);
    const { cart } = state; // get cart item from state

    return (
        <Layout>
            <h1>Корзина</h1>
            <ul>
                {cart.items.length === 0 ? (
                    // return if cart is empty
                    <p>Корзина пуста..</p>
                ) : (
                    cart.items.map((_item) => (
                        // return CartItem card for each item in cart
                        <CartItemCard
                            key={_item._id}
                            cartItem={_item}
                            dispatch={dispatch}
                            cart={cart}
                        />
                    ))
                )}
            </ul>
            <p>Общая сумма: {cart.total}</p>
            <button onClick={() => router.push('/preorder')}>
                Сделать предзаказ
            </button>
        </Layout>
    );
}
