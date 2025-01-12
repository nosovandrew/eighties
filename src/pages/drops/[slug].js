import { useRouter } from 'next/router';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';

import Layout from '@/components/templates/layout';
import ProductCard from '@/components/molecules/productCard';

// import for direct access to DB (see SSG funcs)
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/db/models/product';

const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function Shop({ products, slug }) {
    const router = useRouter();
    // show `loader` if page isn't pre-rendered
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <NextSeo
                title={`Выпуск ${slug}`}
                description={`Список вещей, которые достпны для заказа в выпуске (дропе) #${slug}.`}
            />
            <CardsContainer>
                {products.map((_product) => (
                    // return ProductCard for each product
                    <ProductCard key={_product._id} product={_product} />
                ))}
            </CardsContainer>
        </Layout>
    );
}

// NOTE: getStaticProps/getStaticPaths needs direct access to DB cause API Routes gql endpoint isn't available during build process

// pre-render pages for all drops (releases) in db
export async function getStaticPaths() {
    await dbConnect(); // connect to DB
    const drops = await ProductModel.distinct('drop'); // get all drops (array of numbers)
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
    await dbConnect(); // connect to DB
    const { slug } = params; // get slug of page
    // get array of products (+ product data) from response (slug is number of drop)
    const productsData = await ProductModel.find(
        { drop: slug },
        { price: 1, features: 1, item: 1, drop: 1, skus: 1, slug: 1, images: 1 }
    ).lean(); // lean skip hydrating (document type) the result documents
    // return `Not Found` page if there isn't data (needed if `fallback: true`)
    if (!productsData) {
        return {
            notFound: true,
        };
    }
    // convert ObjectId to String for each product
    const products = productsData.map((_product) => {
        _product._id = _product._id.toString();
        _product.skus.forEach(item => {
            item._id = item._id.toString();
        });
        _product.images.forEach(item => {
            item._id = item._id.toString();
        })

        return _product;
    });

    // revalidate set the time (in sec) of re-generate page (it imitate SSR)
    return { props: { products, slug }, revalidate: 300 };
}
