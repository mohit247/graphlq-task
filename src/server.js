import express from 'express';
const knex = require('./knex/knex.js');
import mysql from 'mysql';
import http from 'http';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schemas';
import { resolvers } from './graphql/resolvers';

const startExpressApolloServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();

  server.applyMiddleware({ app, path: '/api/' });

  await new Promise((resolve) => app.listen({ port: 8000 }, resolve));
  console.log(`Server ready at http://localhost:8000${server.graphqlPath}`);
  return { server, app };
};

startExpressApolloServer();
