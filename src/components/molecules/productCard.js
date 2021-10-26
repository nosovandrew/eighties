import Link from 'next/link';

export default function ProductCard({ product }) {
    const { item, price, slug } = product;

    return (
        <li>
            <Link href='/products/[slug]' as={`/products/${slug}`}>
                {item}
            </Link>
        </li>
    );
}
