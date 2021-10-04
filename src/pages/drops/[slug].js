import { useRouter } from 'next/router';
import { request, gql } from 'graphql-request';

export default function Shop({ products }) {
    // show `loader` if page isn't pre-rendered
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <ul>
            {products.map((product) => (
                <li key={product._id}>{product.item}</li>
            ))}
        </ul>
    );
}

// pre-render pages for all drops (releases) in db
export async function getStaticPaths() {
    const query = gql`
        query ListOfDrops {
            drops
        }
    `;

    const data = await request(process.env.API_ENDPOINT, query);

    const drops = data.drops; // get array of drops from response
    // make array of drop pages (page slugs)
    const paths = drops.map((doc) => {
        return {
            params: {
                slug: doc.toString(),
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
    const query = gql`
        query ListOfProductsByDrop($DropNumber: Int!) {
            productsByDrop(drop: $DropNumber) {
                _id
                item
                features
                price {
                    base
                    currency
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
    const products = data.productsByDrop; // get array of products (+ product data) from response

    // revalidate set the time (in sec) of re-generate page (it imitate SSR)
    return { props: { products }, revalidate: 300 };
}
