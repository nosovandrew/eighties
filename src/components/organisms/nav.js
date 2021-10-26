import { useContext } from 'react';
import Link from 'next/link';

import { CartContext } from '@/contexts/cart/context';

export default function Nav () {
    const { state } = useContext(CartContext);

    return (
        <>
            <Link href='/cart'><a>Cart {state.cart.items.length}</a></Link>
        </>
    );
}