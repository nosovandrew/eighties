import { useRouter } from 'next/router';
import { request, gql } from 'graphql-request';

export default function Product({ product }) {
    // show `loader` if page isn't pre-rendered
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <span>{product.item}</span>
            <br />
            <span>{product.price.base}</span>
            <br />
            {product.features.map((_feature) => (
                <span key={product.features.indexOf(_feature)}>
                    {_feature}
                    <br />
                </span>
            ))}
            <br />
            <span>{product.skus[0].qty}</span>
        </>
    );
}

// pre-render pages for all products in db
export async function getStaticPaths() {
    const query = gql`
        query ListOfProducts {
            products {
                slug
            }
        }
    `;

    const data = await request(process.env.API_ENDPOINT, query);

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
    const query = gql`
        query CertainProductBySlug($ProductSlug: String!) {
            productBySlug(slug: $ProductSlug) {
                item
                features
                price {
                    base
                    currency
                }
                skus {
                    sku
                    qty
                }
            }
        }
    `;

    const data = await request(process.env.API_ENDPOINT, query, variables);
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
