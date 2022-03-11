const express = require("express"),
  http = require("http"),
  path = require("path");
const { connect } = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs } = require("./graphql/schemas/schema");
const { resolvers } = require("./graphql/resolvers/resolver");
console.log(`Trying to connect with: mongodb://localhost/Test-db`);
connect("mongodb://localhost/Test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.log("Error in database connection", err.message);
  });

async function startExpressApolloServer() {
  //   // GraphQL's schema ‘Query’
  //   const typeDefs = gql`
  //     type Query {
  //       hello: String
  //     }
  //   `;
  //   // create resolver functions for Query schema
  //   const resolvers = {
  //     Query: {
  //       hello: () => 'Hello world!',
  //     },
  //   };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();

  server.applyMiddleware({ app, path: "/api/" });

  await new Promise((resolve) => app.listen({ port: 8000 }, resolve));
  console.log(`Server ready at http://localhost:3001${server.graphqlPath}`);
  return { server, app };
}

startExpressApolloServer();
