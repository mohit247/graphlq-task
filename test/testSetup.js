import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from '../src/graphql/schemas';
import { resolvers } from '../src/graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    req,
    res,
  }),
});

module.exports = {
  testClient: createTestClient(server),
};
