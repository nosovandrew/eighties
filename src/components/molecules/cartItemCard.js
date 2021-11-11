import styled from 'styled-components';
import Image from 'next/image';

import { TextItem } from '@/components/atoms/text';
import { CartItemButton } from '@/components/atoms/buttons';

import {
    increase,
    decrease,
    removeItem,
} from '@/contexts/cart/actions';

const ItemContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ImageContainer = styled.div`
    margin: var(--basic-spacing);
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: var(--basic-spacing);
    align-items: flex-start;
`;

const QtyContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export default function CartItemCard({ cartItem, dispatch, cart }) {
    const { _id, item, qtyForSale, image } = cartItem;

    return (
        <ItemContainer>
            <ImageContainer>
                <Image
                        alt={image.alt || item}
                        src={image.url}
                        layout='fixed'
                        width={96}
                        height={96}
                    />
            </ImageContainer>
            <InfoContainer>
                <TextItem>{item}</TextItem>
                <QtyContainer>
                    <TextItem>{`Кол-во: ${qtyForSale}`}</TextItem>
                    <CartItemButton onClick={() => dispatch(increase(_id, cart))}>+</CartItemButton>
                    {qtyForSale > 1 && (
                        <CartItemButton onClick={() => dispatch(decrease(_id, cart))}>-</CartItemButton>
                    )}
                    {qtyForSale === 1 && (
                        <CartItemButton onClick={() => dispatch(removeItem(_id, cart))}>
                            x
                        </CartItemButton>
                    )}
                </QtyContainer>
            </InfoContainer>
        </ItemContainer>
    );
}
