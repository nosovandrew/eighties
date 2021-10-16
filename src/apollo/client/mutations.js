import { gql } from 'graphql-request';

export const CREATE_ORDER = gql`
    mutation createNewOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
            recordId
        }
    }
`;
