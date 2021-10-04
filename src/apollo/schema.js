import { merge } from 'lodash';
import { gql } from 'apollo-server-micro';
import { makeExecutableSchema } from '@graphql-tools/schema';

import GraphQLObjectId from '@/apollo/scalars/objectid';

import {
    typeDefs as Product,
    resolvers as productResolvers,
} from './elements/product';

// empty root Query type for including modules
const Query = gql`
    type Query {
        _empty: String
    }
`;

// empty root Mutation type for including modules
const Mutation = gql`
    type Mutation {
        _empty: String
    }
`;

// empty root resolvers obj for including modules
const resolvers = {
    // add graphql scalars (custom types)
    ObjectId: GraphQLObjectId,
};

// putting everything into a schema
export const schema = makeExecutableSchema({
    typeDefs: [Query, Mutation, Product],
    // merge glue up all resolvers
    resolvers: merge(resolvers, productResolvers),
});
