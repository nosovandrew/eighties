import { merge } from 'lodash';
import { gql } from 'apollo-server-micro';
import { makeExecutableSchema } from '@graphql-tools/schema';

import GraphQLObjectId from '@/apollo/scalars/objectId';
import GraphQLPhoneNumber from '@/apollo/scalars/phoneNumber';

import {
    typeDefs as Product,
    resolvers as productResolvers,
} from './elements/product';

import {
    typeDefs as Order,
    resolvers as orderResolvers,
} from './elements/order';

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
    PhoneNumber: GraphQLPhoneNumber,
};

// putting everything into a schema
export const schema = makeExecutableSchema({
    typeDefs: [Query, Mutation, Product, Order],
    // merge glue up all resolvers
    resolvers: merge(resolvers, productResolvers, orderResolvers),
});
