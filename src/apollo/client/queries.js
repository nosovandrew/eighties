import { gql } from 'graphql-request';

// !!! think about names of queries !!!

export const DROPS = gql`
    query ListOfDrops {
        drops
    }
`;

export const PRODUCTS_BY_DROP = gql`
    query ListOfProductsByDrop($DropNumber: Int!) {
        productsByDrop(drop: $DropNumber) {
            _id
            item
            features
            price {
                base
                currency
            }
            slug
        }
    }
`;

export const SLUGS = gql`
    query ListOfProducts {
        products {
            slug
        }
    }
`;

export const PRODUCT_BY_SLUG = gql`
    query CertainProductBySlug($ProductSlug: String!) {
        productBySlug(slug: $ProductSlug) {
            _id
            item
            features
            price {
                base
                currency
            }
            skus {
                sku
                qtyInStock
            }
        }
    }
`;

export const PRODUCTS_BY_LIST_OF_IDS = gql`
    query GetProductsByItsIds($ids: [ObjectId!]!) {
        productsByListOfIds(ids: $ids) {
            _id
            price {
                base
                currency
            }
            skus {
                sku
                qtyInStock
            }
        }
    }
`;

export const ORDER_BY_ID = gql`
    query GetOrderByItsId($OrderId: ObjectId!) {
        orderById(id: $OrderId) {
            total
        }
    }
`;
