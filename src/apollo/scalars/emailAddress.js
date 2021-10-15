import { Kind, GraphQLError, GraphQLScalarType } from 'graphql';

const EMAIL_ADDRESS_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const GraphQLEmailAddress = new GraphQLScalarType({
    name: 'EmailAddress',

    description: 'Email address type according to RFC822.',

    serialize(value) {
        if (typeof value !== 'string') {
            throw new TypeError(`Value isn't string: ${value}`);
        }

        if (!EMAIL_ADDRESS_REGEX.test(value)) {
            throw new TypeError(`Value isn't a valid email address: ${value}`);
        }

        return value;
    },

    parseValue(value) {
        if (typeof value !== 'string') {
            throw new TypeError(`Value isn't string: ${value}`);
        }

        if (!EMAIL_ADDRESS_REGEX.test(value)) {
            throw new TypeError(`Value isn't a valid email address: ${value}`);
        }

        return value;
    },

    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                `Can only validate strings as email addresses but got a: ${ast.kind}`
            );
        }

        if (!EMAIL_ADDRESS_REGEX.test(ast.value)) {
            throw new TypeError(
                `Value isn't a valid email address: ${ast.value}`
            );
        }

        return ast.value;
    },
    extensions: {
        codegenScalarType: 'string',
    },
});
