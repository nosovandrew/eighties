import { Kind, GraphQLError, GraphQLScalarType } from 'graphql';

const PHONE_NUMBER_REGEX = /^\+[1-9]\d{1,14}$/;

export default new GraphQLScalarType({
    name: 'PhoneNumber',

    description:
        'Phone number type according to E.164 standard. Sample is +19991118899.',

    serialize(value) {
        if (typeof value !== 'string') {
            throw new TypeError(`Value isn't string: ${value}`);
        }

        if (!PHONE_NUMBER_REGEX.test(value)) {
            throw new TypeError(`Value isn't a valid phone number: ${value}`);
        }

        return value;
    },

    parseValue(value) {
        if (typeof value !== 'string') {
            throw new TypeError(`Value isn't string: ${value}`);
        }

        if (!PHONE_NUMBER_REGEX.test(value)) {
            throw new TypeError(
                `Value is not a valid phone number of the form +17895551234 (10-15 digits): ${value}`
            );
        }

        return value;
    },

    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                `Can only validate strings as phone numbers but got a: ${ast.kind}`
            );
        }

        if (!PHONE_NUMBER_REGEX.test(ast.value)) {
            throw new TypeError(
                `Value isn't a valid phone number: ${ast.value}`
            );
        }

        return ast.value;
    },
    extensions: {
        codegenScalarType: 'string',
    },
});
