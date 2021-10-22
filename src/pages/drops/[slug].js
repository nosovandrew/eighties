import { useRouter } from 'next/router';
import { request, gql } from 'graphql-request';
import Link from 'next/link';

// import for direct access to DB (see SSG funcs)
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/db/models/product';

export default function Shop({ products }) {
    const router = useRouter();
    // show `loader` if page isn't pre-rendered
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
        { price: 1, features: 1, item: 1, drop: 1, skus: 1, slug: 1 }
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
        return _product;
    });

    // revalidate set the time (in sec) of re-generate page (it imitate SSR)
    return { props: { products }, revalidate: 300 };
}
