import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

import { typeDefs } from '../src/graphql/schemas';
import { resolvers } from '../src/graphql/resolvers';
import { UserModel } from '../src/models';

const connectToDb = async () => {
  await mongoose
    .connect('mongodb://localhost/Test-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => console.error(error));
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    req,
    res,
    UserModel,
    // DeviceSetting,
  }),
});

module.exports = {
  testClient: createTestClient(server),
  connectToDb,
};
