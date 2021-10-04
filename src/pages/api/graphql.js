import { ApolloServer } from 'apollo-server-micro';

import dbConnect from '@/lib/dbConnect';
import { schema } from '@/apollo/schema';

// connect to db
dbConnect();

const apolloServer = new ApolloServer({ schema });

const startServer = apolloServer.start();

export default async function handler(req, res) {
    // headers for using Apollo GraphQL Dashboard
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
        'Access-Control-Allow-Origin',
        'https://studio.apollographql.com'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    }

    // start server and connect dashboard
    await startServer;
    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};
