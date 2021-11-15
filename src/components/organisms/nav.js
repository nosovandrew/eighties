import { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

import { StyledTagA } from '@/components/atoms/links';

import { CartContext } from '@/contexts/cart/context';

const NavContainer = styled.div`
    width: calc(100% - 2 * var(--basic-spacing));
    height: 44px; // fit logo heifht
    position: fixed;
    z-index: 10;

    // place the nav (cart) to the right
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const LogoContainer = styled.div`
    // center the logo
    position: absolute;
    top: 1px; // fix verical place in nav
    left: calc(
        50% - 22px
    ); // root container width half minus half of logo width
`;

export default function Nav() {
    const { state } = useContext(CartContext);

    return (
        <NavContainer>
            <LogoContainer>
                <Link href='/' passHref>
                    <StyledTagA>
                        <Image
                            alt='Логотип 80 Apparel'
                            src='/site_logo.png'
                            layout='fixed'
                            width={44}
                            height={44}
                        />
                    </StyledTagA>
                </Link>
            </LogoContainer>
            <Link href='/cart' passHref>
                <StyledTagA>
                    Корзина{' '}
                    {state.cart.items.length > 0
                        ? `(${state.cart.items.length})`
                        : ''}
                </StyledTagA>
            </Link>
        </NavContainer>
    );
}
