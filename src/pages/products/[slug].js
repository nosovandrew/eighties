import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { CartContext } from '@/contexts/cart/context';
import { addToCart } from '@/contexts/cart/actions';
import Layout from '@/components/templates/layout';
import styled from 'styled-components';
// import for direct access to DB (see SSG funcs)
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/db/models/product';

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function Product({ product }) {
    const router = useRouter();
    const { state, dispatch } = useContext(CartContext); // get global cart state
    const { cart } = state; // get only cart from state
    // const [tab, setTab] = useState(0); // product images carousel (number of image)
    // show `loader` if page isn't pre-rendered
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    const { _id, item, price, features, skus, images } = product; // separate product object
    // short product obj for adding to cart (with selected sku *in future*)
    const newCartItem = {
        _id,
        item,
        price: price.base, // add only price value
        sku: skus[0].sku,
        image: images[0] // 1st image obg: alt, url (will remove when order throwed)
    };

    return (
        <Layout>
            <ProductContainer>
                <Image
                    alt={images[0].alt}
                    src={images[0].url}
                    layout='fixed'
                    width={300}
                    height={300}
                />
                <h1>{item}</h1>
                <p>{price.base}</p>
                {features.map((_feature) => (
                    <p key={features.indexOf(_feature)}>{_feature}</p>
                ))}
                <p>QTY: {skus[0].qtyInStock}</p>
                <button onClick={() => dispatch(addToCart(newCartItem, cart))}>
                    В корзину
                </button>
            </ProductContainer>
        </Layout>
    );
}

// NOTE: getStaticProps/getStaticPaths needs direct access to DB cause API Routes gql endpoint isn't available during build process

// pre-render pages for all products in db
export async function getStaticPaths() {
    await dbConnect(); // connect to DB
    const products = await ProductModel.find({}, { slug: 1 }); // get all products (only slug field)
    // make array of product pages (page slugs)
    const paths = products.map((_product) => {
        return {
            params: { slug: _product.slug.toString() }, // ObjectID to String
        };
    });

    // `fallback: true` shows loading if page isn't pre-rendered
    return { paths, fallback: true };
}

// get data for each product page
export async function getStaticProps({ params }) {
    await dbConnect(); // connect to DB
    const { slug } = params; // get slug of page
    // get product by certain slug (return only needs fields)
    const product = await ProductModel.findOne(
        { slug },
        { price: 1, features: 1, item: 1, drop: 1, skus: 1, images: 1 }
    ).lean(); // lean skip hydrating (document type) the result documents
    // return `Not Found` page if there isn't data (needed if `fallback: true`)
    if (!product) {
        return {
            notFound: true,
        };
    }
    product._id = await product._id.toString(); // ObjectId to String

    // revalidate set the time (in sec) of re-generate page (it imitate SSR)
    return { props: { product }, revalidate: 300 };
}
