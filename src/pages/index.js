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
        width: 600px;
    }
`;

const Home = () => {
    return (
        <Layout>
            <HomeContainer>
                <ImageContainer>
                    <Image
                        alt='Ретро фото на главной странице'
                        src='/assets/kodak_brown.jpg'
                        layout='intrinsic'
                        width={1080}
                        height={1080}
                    />
                </ImageContainer>
                <Link href='/drops/1' passHref>
                    <StyledTagA>Выпуск 1</StyledTagA>
                </Link>
            </HomeContainer>
        </Layout>
    );
};

export default Home;
