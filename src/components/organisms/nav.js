import { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

import { StyledTagA } from '@/components/atoms/links';
import { CartContext } from '@/contexts/cart/context';

const NavContainer = styled.div`
    width: calc(100% - 2*var(--basic-spacing));
    height: 44px;
    position: fixed;
    z-index: 10;

    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const LogoContainer = styled.div`
    position: absolute;
    left: calc(50% - 22px);
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
                            src='/logo.png'
                            layout='fixed'
                            width={44}
                            height={44}
                        />
                    </StyledTagA>
                </Link>
            </LogoContainer>
            <Link href='/cart' passHref>
                <StyledTagA>Cart {state.cart.items.length}</StyledTagA>
            </Link>
        </NavContainer>
    );
}
