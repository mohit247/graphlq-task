const { gql } = require('apollo-server-express');
const { testClient, connectToDb } = require('./testSetup');
const { ObjectId } = require('mongodb');

const { query, mutate } = testClient;

beforeAll(async () => {
  await connectToDb();
  //await dropTestDb();
});

describe('User Methods', () => {
  const user = '622aef371e9a9941e82f8396';

  it('Add User', async () => {
    const addUser = gql`
      mutation addUser(
        $firstName: String!
        $lastName: String!
        $email: String!
        $age: Int!
      ) {
        addUser(
          firstName: $firstName
          lastName: $lastName
          email: $email
          age: $age
        ) {
          firstName
          lastName
          email
          age
        }
      }
    `;
    const user = {
      firstName: 'first name',
      lastName: 'The Brand',
      email: 'Description@gmail.com',
      age: 13,
    };

    const { data } = await mutate({
      mutation: addUser,
      variables: {
        ...user,
      },
    });

    expect(data).toEqual({
      addUser: {
        ...user,
      },
    });
  });

  it('Get User Details', async () => {
    const viewUser = gql`
      query viewUser($id: ID!) {
        viewUser(id: $id) {
          _id

          firstName
          lastName
          email
        }
      }
    `;
    const { data } = await query({
      mutation: viewUser,
      variables: {
        id: user,
      },
    });
    expect(data).not.toEqual(null);
    expect(data).not.toEqual(undefined);
  });
  it('Get Users', async () => {
    const getUsers = gql`
      query getUsers {
        getUsers {
          _id
          firstName
          lastName
          email
        }
      }
    `;
    const { data } = await query({
      mutation: getUsers,
      variables: {},
    });

    expect(data).not.toEqual(null);
    expect(data).not.toEqual(undefined);
  });
});
