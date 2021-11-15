import useSWR from 'swr';
import { request } from 'graphql-request';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import { media } from '@/styles/media';
import { H1, TextItem } from '@/components/atoms/text';
import { StyledTagA } from '@/components/atoms/links';

import { formatPrice } from '@/utils/formats';
import { ORDER_BY_ID } from '@/apollo/client/queries';

const SuccessContainer = styled.div`
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

const LogoContainer = styled.div`
    margin: calc(var(--basic-spacing)*6);
`;

const ItemsContainer = styled.div`
    padding: calc(var(--basic-spacing)*2) 0;
`;

const ItemContainer = styled.div`
    margin: calc(var(--basic-spacing)*2);

    // change TextItem styles
    & > p {
        text-align: center;
    }
`;

export default function Success() {
    // get id from url
    const {
        query: { id },
    } = useRouter();

    // GQL fetcher function (gets params and run request)
    const fetcher = async (query) =>
        await request(process.env.API_ENDPOINT, query, { OrderId: id });

    // useSWR func for CSR
    const { data, error } = useSWR(id ? ORDER_BY_ID : null, fetcher); // conditional expression helps to get rid the Automatic Static Optimization

    // handle not success data fetching scenarios
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    const { _id, items, total } = data.orderById; // get data fields

    return (
        <SuccessContainer>
            <NextSeo 
                title='Заказ успешно создан!'
                description='Информация о успешно созданном заказе.'
                noindex={true}
                nofollow={true} />
            <LogoContainer>
                <Link href='/' passHref>
                    <StyledTagA>
                        <Image
                            alt='Логотип 80 Apparel'
                            src='/site_logo.png'
                            layout='fixed'
                            width={56}
                            height={56}
                        />
                    </StyledTagA>
                </Link>
            </LogoContainer>
            <H1>Заказ создан</H1>
            <TextItem>{_id}</TextItem>
            <ItemsContainer>
                {items.map((_item) => (
                    <ItemContainer key={items.indexOf(_item)}>
                        <TextItem>{_item.item.toUpperCase()}</TextItem>
                        <TextItem>Размер: ONESIZE</TextItem> {/* !!! размер пока не реализован в заказе */}
                        <TextItem>Цена: {formatPrice(_item.price)}</TextItem>
                        <TextItem>Кол-во: {_item.qtyForSale}</TextItem>
                    </ItemContainer>
                ))}
            </ItemsContainer>
            <TextItem>Общая сумма: {formatPrice(total)}</TextItem>
        </SuccessContainer>
    );
}
