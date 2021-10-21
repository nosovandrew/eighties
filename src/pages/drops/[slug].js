import { useRouter } from 'next/router';
import { request, gql } from 'graphql-request';
import Link from 'next/link';

import { DROPS, PRODUCTS_BY_DROP } from '@/apollo/client/queries';

export default function Shop({ products }) {
    // show `loader` if page isn't pre-rendered
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <ul>
            {products.map((_product) => (
                // separate _product
                <li key={_product._id}>
                    <Link
                        href='/products/[slug]'
                        as={`/products/${_product.slug}`}
                    >
                        {_product.item}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

// pre-render pages for all drops (releases) in db
export async function getStaticPaths() {
    // API ENDPOINT MUST BE EXTERNAL
    const data = await request(process.env.API_ENDPOINT, DROPS); // DROPS query imported

    const drops = data.drops; // get array of drops from response
    // make array of drop pages (page slugs)
    const paths = drops.map((_drop) => {
        return {
            params: {
                slug: _drop.toString(),
            },
        };
    });

    // `fallback: true` shows loading if page isn't pre-rendered
    return { paths, fallback: true };
}

// get data for each drop page
export async function getStaticProps({ params }) {
    const { slug } = params; // get slug of page
    // throw slug to gql query
    const variables = {
        DropNumber: parseInt(slug, 10),
    };
    // API ENDPOINT MUST BE EXTERNAL
    const data = await request(
        process.env.API_ENDPOINT,
        PRODUCTS_BY_DROP,
        variables
    ); // PRODUCTS_BY_DROP query imported
    // return `Not Found` page if there isn't data (needed if `fallback: true`)
    if (!data) {
        return {
            notFound: true,
        };
    }
    const products = data.productsByDrop; // get array of products (+ product data) from response

    // revalidate set the time (in sec) of re-generate page (it imitate SSR)
    return { props: { products }, revalidate: 300 };
}
