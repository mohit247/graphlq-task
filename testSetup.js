const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const { typeDefs } = require('./src/graphql/schemas/schema');
const { resolvers } = require('./src/graphql/resolvers/resolver');
// const Device = require('../models/Device');
// const DeviceSetting = require('../models/DeviceSetting');
const UserModel = require('./src/models/User');

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
