import { merge } from 'lodash';
import { gql } from 'apollo-server-micro';
import { makeExecutableSchema } from '@graphql-tools/schema'

import {
    typeDefs as Product,
    resolvers as productResolvers,
} from './elements/product';

const Query = gql`
    type Query {
        _empty: String
    }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
    typeDefs: [Query, Product],
    resolvers: merge(resolvers, productResolvers),
});
