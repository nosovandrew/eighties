import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import { TextItem } from '@/components/atoms/text';
import { media } from '@/styles/media';
import { StyledTagA } from '@/components/atoms/links';

import { formatPrice } from '@/utils/formats';

const CardContainer = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--basic-spacing);

    cursor: pointer;
`;

const ImageContainer = styled.div`
    margin: var(--content-spacing) var(--basic-spacing);
    width: 250px;
    height: auto;

    @media ${media.md} {
        width: 450px;
    }
`;

export default function ProductCard({ product }) {
    const { item, price, slug, images } = product;

    return (
        <Link href='/products/[slug]' as={`/products/${slug}`} passHref>
            <StyledTagA>
                <CardContainer>
                    <ImageContainer>
                        <Image
                            alt={images[1].alt}
                            src={images[1].url}
                            layout='intrinsic'
                            width={1080}
                            height={1080}
                        />
                    </ImageContainer>
                    <TextItem>{item.slice(6).toUpperCase()}</TextItem>
                    <TextItem>{formatPrice(price.base)}</TextItem>
                </CardContainer>
            </StyledTagA>
        </Link>
    );
}
