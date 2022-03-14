import { connect } from 'mongoose';
import express from 'express';
const knex = require('./knex/knex.js');
import mysql from 'mysql';
import http from 'http';
import path from 'path';
import { ApolloServer, gql } from 'apollo-server-express';
import { typeDefs } from './graphql/schemas';
import { resolvers } from './graphql/resolvers';
// try {
//   const knex = require('knex')({
//     client: 'mysql',
//     connection: {
//       host: '127.0.0.1',
//       port: 3306,
//       user: 'root',
//       password: '123456',
//       database: 'testdb',
//     },
//   });
// } catch (error) {
//   console.log('error', error);
// }

// const result = knex.select('*').from('user');

// connect('mongodb://localhost/Test-db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Database connected successfully.');
//   })
//   .catch((err) => {
//     console.log('Error in database connection', err.message);
//   });

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
