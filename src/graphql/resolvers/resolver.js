const { ApolloServer, gql } = require('apollo-server-express');

const { Types } = require('mongoose');
let UserModel = require('../../models/User');
const resolvers = {
  Query: {
    hello: () => 'Hello Mohit!',
    getUsers: async () => {
      console.log(' UserModel.find()', await UserModel.find().lean());
      return await UserModel.find().lean();
    },
    viewUser: async (parent, args) => {
      console.log(args, 'args');

      const data = await UserModel.findOne({
        _id: Types.ObjectId(args.id),
      });
      console.log(data, 'data');
      return data;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      console.log('args', args);
      let obj = {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        age: args.age,
      };
      return await UserModel.create(obj);
    },
    updateUser: async (parent, args) => {
      console.log(args, 'args');
      let obj = {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        age: args.age,
      };
      const data = await UserModel.updateOne({ _id: args.id }, { ...obj });
      return await UserModel.findOne({
        _id: Types.ObjectId(args.id),
      });
    },
    changePassword: async (parent, args) => {
      const data = await UserModel.findOne({ email: args.email });
      if (!data) {
        return 'User Not Found';
      }
      if (data.password == args.newPassword) {
        return 'New Password Can Not be same as Old Password';
      }
      await UserModel.updateOne(
        {
          _id: Types.ObjectId(data._id),
        },
        {
          password: args.newPassword,
        }
      );
      return data;
    },
  },
};
module.exports = { resolvers };
