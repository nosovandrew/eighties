import styled from 'styled-components';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import { media } from '@/styles/media';
import Layout from '@/components/templates/layout';
import { PageH1, TextBlock } from '@/components/atoms/text';

const ShippingContainer = styled.div`
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

const ImageContainer = styled.div`
    width: 32px;
    height: auto;
    margin: calc(2 * var(--basic-spacing)) 0;

    @media ${media.md} {
        width: 64px;
    }
`;

export default function ShippingInfo() {
    return (
        <Layout>
            <NextSeo
                title='Доставка'
                description= 'Вся актуальная информация о доставке.'
            />
            <ShippingContainer>
                <PageH1>Доставка</PageH1>
                <TextBlock>
                    Бесплатно. Любыми возможными/удобными способами. По всему
                    миру.
                </TextBlock>
                <ImageContainer>
                    <Image
                        alt='Посылка'
                        src='/assets/box.png'
                        layout='intrinsic'
                        width={160}
                        height={160}
                    />
                </ImageContainer>
            </ShippingContainer>
        </Layout>
    );
}
