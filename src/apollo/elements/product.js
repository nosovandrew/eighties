import { gql } from 'apollo-server-micro';

import Product from '@/db/models/product';

// graphql schema for product entity
export const typeDefs = gql`
    # add custom types
    scalar ObjectId

    # extend for divide schema on modules (root Query in schema.js)
    extend type Query {
        "Get all products in db."
        products: [Product!]!
        "Get all products with specific drop number."
        productsByDrop(drop: Int!): [Product!]!
        "Get product/products with specific ID (input should be Array)."
        productsByListOfIds(ids: [ObjectId!]!): [Product!]!
        "Get only one product with specific slug string."
        productBySlug(slug: String!): Product!
        "Get all drops (releases) in db."
        drops: [Int!]!
    }

    "Item (product) in shop (related to drop number)."
    type Product {
        _id: ObjectId!
        item: String!
        price: ProductPrice!
        features: [String!]!
        drop: Int!
        skus: [ProductSku!]!
        slug: String!
        images: [ProductImage!]!
    }

    "Used in Product type."
    type ProductPrice {
        base: Float!
        currency: PriceCurrency
    }

    "Used in ProductPrice type."
    enum PriceCurrency {
        RUB
        USD
    }

    "Used in Product type."
    type ProductSku {
        sku: String!
        qtyInStock: Int!
        options: SkuOptions!
    }

    "Used in ProductSku type."
    type SkuOptions {
        size: OptionsSize
    }

    "Used in Product>SkuOptions type."
    enum OptionsSize {
        ONESIZE
        XXS
        XS
        S
        M
        L
        XL
        XXL
    }

    "Used in Product type."
    type ProductImage {
        alt: String!
        url: String!
    }
`;

// graphql resolvers for product entity
export const resolvers = {
    Query: {
        // get all products in db
        products: async () => {
            try {
                const products = await Product.find({});

                return products;
            } catch (err) {
                console.error(err);
            }
        },
        // get products with specific drop number
        productsByDrop: async (_parent, args, _context, _info) => {
            try {
                const products = await Product.find({ drop: args.drop });

                return products;
            } catch (err) {
                console.error(err);
            }
        },
        // get product with specific _id (MongoDB ObjectID type)
        // <need to make array of ids>
        productsByListOfIds: async (_parent, args, _context, _info) => {
            try {
                const listOfIds = args.ids; // get list of identifiers
                const products = await Product.find({ _id: listOfIds }); 

                return products;
            } catch (err) {
                console.error(err);
            }
        },
        // get product with specific slug
        productBySlug: async (_parent, args, _context, _info) => {
            // slug scalar is needed!
            try {
                const product = await Product.findOne({ slug: args.slug });

                return product;
            } catch (err) {
                console.error(err);
            }
        },
        // get all drops in db
        drops: async () => {
            try {
                const drops = await Product.distinct('drop');

                return drops;
            } catch (err) {
                console.error(err);
            }
        },
    },
};
