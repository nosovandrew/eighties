import { gql } from 'apollo-server-micro';

import Order from '@/db/models/order';

export const typeDefs = gql`
    # add custom types
    scalar ObjectId
    scalar PhoneNumber

    # extend for divide schema on modules (root empty Query in schema.js)
    extend type Query {
        "Get order by its identifier."
        orderById(id: ObjectId!): Order!
    }

    # extend for divide schema on modules (root empty Mutation in schema.js)
    extend type Mutation {
        "Collect order and send to db."
        createOrder(input: CreateOrderInput!): CreateOrderPayload!
    }

    "Input type with all arguments for createOrder mutation."
    input CreateOrderInput {
        shipping: OrderShippingInput!
        phoneNumber: PhoneNumber!
        items: [OrderItemInput!]!
        total: Int!
        currency: OrderCurrencyEnum
    }

    "Used in CreateOrderInput (shipping info)."
    input OrderShippingInput {
        firstName: String!
        lastName: String!
        address: String!
        postalCode: String! # scalar
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
        recordId: ObjectId!
        record: Order
    }

    "Customer cart with shipping and contact info (order)."
    type Order {
        _id: ObjectId!
        shipping: OrderShipping!
        phoneNumber: PhoneNumber!
        items: [OrderItem!]!
        total: Int!
        currency: OrderCurrencyEnum
    }

    "Used in Order type (order shipping info)"
    type OrderShipping {
        firstName: String!
        lastName: String!
        address: String!
        postalCode: String! # scalar
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
    Query: {
        // get order with specific id
        orderById: async (_parent, args, _context, _info) => {
            try {
                const order = await Order.findById({ _id: args.id });

                return order;
            } catch (err) {
                console.error(err);
            }
        },
    },
    Mutation: {
        // save collected order in db
        createOrder: async (_parent, args, _context, _info) => {
            // saving new order
            try {
                const newOrder = new Order(args.input); // create order via mongoose model (generate _id)
                const record = await newOrder.save(); // save order in db and return new record (from db)
                const recordId = record._id;

                return { recordId, record };
            } catch (err) {
                console.error(err);
            }
        },
    },
};
