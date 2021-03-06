import { useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';

import { PageH1 } from '@/components/atoms/text';
import StyledButton from '@/components/atoms/buttons';
import { media } from '@/styles/media';
import Layout from '@/components/templates/layout';

import { formatPrice } from '@/utils/formats';
import CartItemCard from '@/components/molecules/cartItemCard';
import { CartContext } from '@/contexts/cart/context';

const CartContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media ${media.md} {
        width: auto;
        height: var(--full-screen-h);
        margin: 0;
    }
`;

const CartItemsContainer = styled.div``;

export default function Cart() {
    const router = useRouter(); // for redirecting to order page
    const { state, dispatch } = useContext(CartContext);
    const { cart } = state; // get cart item from state

    return (
        <Layout>
            <NextSeo
                title='Корзина'
                description='Корзина с вещами, которые клиент собирается добавить в свой заказ. Есть возможность изменить количество, а также удалить из корзины.'
            />
            <CartContainer>
                <PageH1>Корзина</PageH1>
                <CartItemsContainer>
                    {cart.items.length === 0 ? (
                        // return if cart is empty
                        <p>Пусто..</p>
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
                </CartItemsContainer>
                {/* show btn if cart isn't empty */}
                {cart.items.length !== 0 && (
                    <>
                        <p>Общая сумма: {formatPrice(cart.total)}</p>
                        <StyledButton onClick={() => router.push('/makeorder')}>
                            Сделать предзаказ
                        </StyledButton>
                    </>
                )}
            </CartContainer>
        </Layout>
    );
}
