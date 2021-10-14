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
        "Get only one product with specific slug string."
        productBySlug(slug: String!): Product!
        "Get only one product with specific ID."
        productById(id: ObjectId!): Product!
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
        skus: [ProductSkus!]!
        slug: String!
    }

    "Used in Product type."
    type ProductPrice {
        "Price value"
        base: Float!
        currency: PriceCurrency
    }

    "Used in ProductPrice type."
    enum PriceCurrency {
        RUB
        USD
    }

    "Used in Product type."
    type ProductSkus {
        sku: String!
        qtyInStock: Int!
        options: SkusOptions!
    }

    "Used in ProductSkus type."
    type SkusOptions {
        size: OptionsSize
    }

    "Used in Product>SkusOptions type."
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
        productById: async (_parent, args, _context, _info) => {
            try {
                const product = await Product.findById({ _id: args.id });

                return product;
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
