import Layout from '@/components/templates/layout';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import { StyledTagA } from '@/components/atoms/links';
import { media } from '@/styles/media';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ${media.md} {
        width: auto;
        height: var(--full-screen-h);
        margin: 0;
        /* padding-top: calc(44px + var(--basic-spacing)); // get rid nav on big screens */
        justify-content: center;
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    height: auto;

    @media ${media.md} {
        width: 500px;
    }
`;

const LinksContainer = styled.div`
    display: grid;
    /* grid-template-rows: repeat(4, 1fr); */
    grid-template-columns: 1fr;
    justify-items: center;
    gap: calc(4 * var(--basic-spacing));
    margin: calc(4 * var(--basic-spacing));

    @media ${media.md} {
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: repeat(2, 1fr);
    }
`;

const Home = () => {
    return (
        <Layout>
            <NextSeo
                title='80 Religion'
                description='Бренд, приближенный к своим клиентам. Мы хотим создавать вещи совместно с людьми, опираясь на их отзывы и пожелания. Все вещи выпускаются ограниченными сериями (дропами), либо в единичном экземпляре.'
            />
            <HomeContainer>
                <Link href='/drops/1' passHref>
                    <StyledTagA>
                        <ImageContainer>
                            <Image
                                alt='Изображение выпуска №1 на главной странице магазина'
                                src='/assets/drop1.png'
                                layout='intrinsic'
                                width={2160}
                                height={2160}
                            />
                        </ImageContainer>
                    </StyledTagA>
                </Link>
                <LinksContainer>
                    <Link href='/drops/1' passHref>
                        <StyledTagA>КАТАЛОГ</StyledTagA>
                    </Link>
                    <Link href='/preorders' passHref>
                        <StyledTagA>ПРЕДЗАКАЗЫ</StyledTagA>
                    </Link>
                    <Link href='/shipping' passHref>
                        <StyledTagA>ДОСТАВКА</StyledTagA>
                    </Link>
                    <StyledTagA
                        href='https://t.me/andrewnosov'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        СВЯЗЬ
                    </StyledTagA>
                </LinksContainer>
            </HomeContainer>
        </Layout>
    );
};

export default Home;
