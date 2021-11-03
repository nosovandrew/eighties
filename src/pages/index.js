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

const Home = () => {
    return (
        <Layout>
            <HomeContainer>
                <Image
                    alt='Ретро фото на главной странице'
                    src='/assets/kodak_brown.jpg'
                    layout='fixed'
                    width={200}
                    height={200}
                />
                <Link href='/drops/1' passHref>
                    <StyledTagA>Выпуск 1</StyledTagA>
                </Link>
            </HomeContainer>
        </Layout>
    );
};

export default Home;
