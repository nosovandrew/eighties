import { gql } from 'apollo-server-micro';

import Order from '@/db/models/order';

export const typeDefs = gql`
    # add custom types
    scalar ObjectId
    scalar PhoneNumber

    # extend for divide schema on modules (root empty Mutation in schema.js)
    extend type Mutation {
        "Collect order and send to db."
        createOrder(input: CreateOrderInput!): CreateOrderPayload!
    }

    "Input type with all arguments for createOrder mutation."
    input CreateOrderInput {
        shippingAddress: String!
        phoneNumber: PhoneNumber!
        items: [OrderItemInput!]!
        total: Int!
        currency: OrderCurrencyEnum
    }

    "Used in CreateOrderInput (cart item)."
    input OrderItemInput {
        _id: ObjectId!
        item: String!
        price: Float!
        sku: String! # need to make custom scalar
        qtyForSale: Int!
    }

    "Return of createOreder mutation."
    type CreateOrderPayload {
        order: Order!
    }

    "Customer cart with shipping and contact info (order)."
    type Order {
        _id: ObjectId!
        shippingAddress: String!
        phoneNumber: PhoneNumber!
        items: [OrderItem!]!
        total: Int!
        currency: OrderCurrencyEnum
    }

    "Used in Order type (describes item in cart)."
    type OrderItem {
        _id: ObjectId!
        item: String!
        price: Float!
        sku: String! # need to make custom scalar
        qtyForSale: Int!
    }

    "Used in Order and OrderInput type."
    enum OrderCurrencyEnum {
        RUB
        USD
    }
`;

// graphql resolvers for order entity
export const resolvers = {
    Mutation: {
        // save collected order in db
        createOrder: async (_parent, args, _context, _info) => {
            // saving new order
            try {
                const order = new Order(args.input); // create order via mongoose model (generate _id)
                await order.save(); // save order in db

                return { order };
            } catch (err) {
                console.error(err);
            }
        },
    },
};
