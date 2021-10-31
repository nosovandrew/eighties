import styled from 'styled-components';
import Image from 'next/image';

import {
    increase,
    decrease,
    removeFromCart,
} from '@/contexts/cart/actions';

const ItemContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export default function CartItemCard({ cartItem, dispatch, cart }) {
    const { _id, item, qtyForSale, image } = cartItem;

    return (
        <ItemContainer>
            <div>
                <Image
                        alt={image.alt || item}
                        src={image.url}
                        layout='fixed'
                        width={64}
                        height={64}
                    />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {item}
                <div>
                    {`QTY: ${qtyForSale}`}
                    <button onClick={() => dispatch(increase(_id, cart))}>+</button>
                    {qtyForSale > 1 && (
                        <button onClick={() => dispatch(decrease(_id, cart))}>-</button>
                    )}
                    {qtyForSale === 1 && (
                        <button onClick={() => dispatch(removeFromCart(_id, cart))}>
                            x
                        </button>
                    )}
                </div>
            </div>
        </ItemContainer>
    );
}
