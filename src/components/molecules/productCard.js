import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import { StyledTagA } from '@/components/atoms/links';

const CardContainer = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;

    cursor: pointer;
`;

const ImageContainer = styled.div`
    margin: var(--content-spacing) var(--basic-spacing);
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
                            layout='fixed'
                            width={250}
                            height={250}
                        />
                    </ImageContainer>
                    <span>{item}</span>
                    <span>{price.base}</span>
                </CardContainer>
            </StyledTagA>
        </Link>
    );
}
