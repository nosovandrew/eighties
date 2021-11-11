import Layout from '@/components/templates/layout';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

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
    grid-template-rows: repeat(4, 1fr);
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
            <HomeContainer>
                <Link href='/drops/1' passHref>
                    <StyledTagA>
                        <ImageContainer>
                            <Image
                                alt='Ретро фото на главной странице'
                                src='/assets/kodak_brown.png'
                                layout='intrinsic'
                                width={1080}
                                height={1080}
                            />
                        </ImageContainer>
                    </StyledTagA>
                </Link>
                <LinksContainer>
                    <Link href='/drops/1' passHref>
                        <StyledTagA>ВЫПУСК №1</StyledTagA>
                    </Link>
                    <Link href='/preorders' passHref>
                        <StyledTagA>ПРЕДЗАКАЗЫ</StyledTagA>
                    </Link>
                    <Link href='/shipping' passHref>
                        <StyledTagA>ДОСТАВКА</StyledTagA>
                    </Link>
                    <StyledTagA
                        href='https://t.me/eightiesinprogress'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        ТЕЛЕГРАМ
                    </StyledTagA>
                </LinksContainer>
            </HomeContainer>
        </Layout>
    );
};

export default Home;
