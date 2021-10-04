import { Kind, GraphQLError, GraphQLScalarType } from 'graphql';

const MONGODB_OBJECTID_REGEX = /^[A-Fa-f0-9]{24}$/;

export default new GraphQLScalarType({
    name: 'ObjectId',
    description: 'The `ObjectId` scalar type represents a mongoDB unique ID',

    serialize(value) {
        if (!MONGODB_OBJECTID_REGEX.test(value)) {
            throw new TypeError(
                `Value is not a valid mongodb object id of form: ${value}`
            );
        }

        return value;
    },

    parseValue(value) {
        if (!MONGODB_OBJECTID_REGEX.test(value)) {
            throw new TypeError(
                `Value is not a valid mongodb object id of form: ${value}`
            );
        }

        return value;
    },

    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                `Can only validate strings as mongodb object id but got a: ${ast.kind}`
            );
        }

        if (!MONGODB_OBJECTID_REGEX.test(ast.value)) {
            throw new TypeError(
                `Value is not a valid mongodb object id of form: ${ast.value}`
            );
        }

        return ast.value;
    },
});
