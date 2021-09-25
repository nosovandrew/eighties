import { gql } from 'apollo-server-micro';

import Product from '@/db/models/product';

export const typeDefs = gql`
    extend type Query {
        getProducts: [Product]!
    }

    type Product {
        title: String!
    }
`;

export const resolvers = {
    Query: {
        getProducts: async () => {
            try {
                const products = await Product.find({});
                
                return products;
            } catch (err) {
                console.log(err);
            }
        },
    },
};
