import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';

import { H1, TextItem } from '@/components/atoms/text';
import StyledButton from '@/components/atoms/buttons';
import Layout from '@/components/templates/layout';
import ImageRenderer from '@/components/atoms/ImageRenderer';
import { media } from '@/styles/media';

import { formatPrice } from '@/utils/formats';
import { CartContext } from '@/contexts/cart/context';
import { addItem } from '@/contexts/cart/actions';
// import for direct access to DB (see SSG funcs)
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/db/models/product';

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media ${media.md} {
        width: auto;
        height: var(--full-screen-h);
        margin: 0;
        flex-direction: row;
    }
`;

const ImageContainer = styled.div`
    width: 250px;
    height: 250px; // declare height for placeholder (inheritance)

    @media ${media.md} {
        width: 450px;
        height: 450px; // declare height for placeholder (inheritance)
    }
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ${media.md} {
        align-items: flex-start;
        margin-left: calc(2 * var(--content-spacing));
    }
`;

const InfoBlock = styled.div`
    margin: calc(1.5 * var(--basic-spacing)) 0;
`;

export default function Product({ product }) {
    const router = useRouter();
    const { state, dispatch } = useContext(CartContext); // get global cart state
    const { cart } = state; // get only cart from state
    const [itemAdded, setItemAdded] = useState(false); // current item is added to cart indicator
    // const [loading, setLoading] = useState(false); // addToCart button loading indicator
    // const [tab, setTab] = useState(0); // product images carousel (number of image)
    // chaecking if item is added to cart (first page load + when cart have changed)
    useEffect(() => {
        // if cart contains current product -> set true
        if (cart.items.some((cartItem) => cartItem._id === product._id)) {
            setItemAdded(true);
        }
        // disable warning cause product never be changed
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart.items]);
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
        image: images[1], // 1st image obg: alt, url (will remove when order throwed)
    };

    // hadle addToCart button click
    const addItemToCart = () => {
        try {
            if (!itemAdded) dispatch(addItem(newCartItem, cart));
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Layout>
            <NextSeo
                title={`${item}`}
                description={`Карточка товара "${item}" с изображением, описанием и кнопкой для добавления в корзину.`}
            />
            <ProductContainer>
                <ImageContainer>
                    <ImageRenderer
                        alt={images[1].alt}
                        src={images[1].url}
                        layout='intrinsic'
                        width={1080}
                        height={1080}
                    />
                </ImageContainer>
                <ProductInfo>
                    <InfoBlock>
                        <H1>{item.toUpperCase()}</H1>
                        <TextItem>{formatPrice(price.base)}</TextItem>
                    </InfoBlock>
                    <InfoBlock>
                        {features.map((_feature) => (
                            <TextItem key={features.indexOf(_feature)}>
                                {_feature}
                            </TextItem>
                        ))}
                    </InfoBlock>
                    {/* <TextItem>Наличие: {skus[0].qtyInStock}</TextItem> */}
                    {/* make condition: if qtyInStock -> one logic, else other logic (preorder) */}
                    <InfoBlock>
                        <TextItem>
                            Предзаказ
                            <br />
                            (инф. на главной)
                        </TextItem>
                    </InfoBlock>
                    <StyledButton onClick={() => addItemToCart()}>
                        {itemAdded ? 'Добавлено' : 'В корзину'}
                    </StyledButton>
                </ProductInfo>
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
