import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    age: Int!
  }
  type Query {
    getUsers: [User!]!
    viewUser(id: ID!): User!
  }
  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      age: Int!
    ): User!
    updateUser(
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      age: Int!
    ): User!
    changePassword(
      newPassword: String!
      oldPassword: String!
      email: String!
    ): User!
  }
`;

export { typeDefs };
