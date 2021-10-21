import { useContext } from 'react';
import { useRouter } from 'next/router';
import { request } from 'graphql-request';
import Link from 'next/link';

import { CartContext } from '@/contexts/cart/context';
import { addToCart } from '@/contexts/cart/actions';
import { SLUGS, PRODUCT_BY_SLUG } from '@/apollo/client/queries';

export default function Product({ product }) {
    const { _id, item, price, features, skus } = product; // separate product object
    const { state, dispatch } = useContext(CartContext); // get global cart state
    const { cart } = state; // get only cart from state
    // short product obj for adding to cart (with selected sku *in future*)
    const newCartItem = {
        _id,
        item,
        price: price.base, // add only price value
        sku: skus[0].sku,
    };
    // show `loader` if page isn't pre-rendered
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>{item}</h1>
            <p>{price.base}</p>
            {features.map((_feature) => (
                <p key={features.indexOf(_feature)}>{_feature}</p>
            ))}
            <p>QTY: {skus[0].qtyInStock}</p>
            <button onClick={() => dispatch(addToCart(newCartItem, cart))}>
                В корзину
            </button>
            <Link href='/cart'>Корзина</Link>
        </>
    );
}

// pre-render pages for all products in db
export async function getStaticPaths() {
    // API ENDPOINT MUST BE EXTERNAL
    const data = await request(process.env.API_ENDPOINT, SLUGS); // SLUGS query imported

    const products = data.products; // get array of products from response
    // make array of product pages (page slugs)
    const paths = products.map((_product) => {
        return {
            params: { slug: _product.slug },
        };
    });

    // `fallback: true` shows loading if page isn't pre-rendered
    return { paths, fallback: true };
}

// get data for each product page
export async function getStaticProps({ params }) {
    const { slug } = params; // get slug of page
    // throw slug to gql query
    const variables = {
        ProductSlug: slug,
    };
    // API ENDPOINT MUST BE EXTERNAL
    const data = await request(
        process.env.API_ENDPOINT,
        PRODUCT_BY_SLUG,
        variables
    ); // PRODUCT_BY_SLUG query imported
    // return `Not Found` page if there isn't data (needed if `fallback: true`)
    if (!data) {
        return {
            notFound: true,
        };
    }
    const product = data.productBySlug; // get product data from response

    // revalidate set the time (in sec) of re-generate page (it imitate SSR)
    return { props: { product }, revalidate: 300 };
}
