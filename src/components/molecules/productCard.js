import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const CardContainer = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;

    cursor: pointer;
`;

export default function ProductCard({ product }) {
    const { item, price, slug, images } = product;

    return (
        <Link href='/products/[slug]' as={`/products/${slug}`}>
            <a>
                <CardContainer>
                    <Image
                        alt={images[0].alt}
                        src={images[0].url}
                        layout='fixed'
                        width={300}
                        height={300}
                    />
                    <span>{item}</span>
                </CardContainer>
            </a>
        </Link>
    );
}
