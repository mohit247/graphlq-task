import knex from '../../knex/knex';

const resolvers = {
  Query: {
    getUsers: async () => {
      return await knex.select().table('user');
    },
    viewUser: async (parent, args) => {
      const data = await knex('user').where('id', 1);

      console.log(data, 'data');
      return data[0];
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      let obj = {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        password: args.password,
        age: args.age,
      };

      await knex('user').insert(obj);

      return obj;
    },
    updateUser: async (parent, args) => {
      console.log(args, 'args');
      let obj = {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        age: args.age,
      };
      await knex('user').where('id', '=', args.id).update(obj);

      const data = await knex('user').where('id', args.id);
      return data[0];
    },
    changePassword: async (parent, args) => {
      const data = await knex('user').where('email', args.email);
      if (!data) {
        return 'User Not Found';
      }
      if (data[0].password == args.newPassword) {
        return 'New Password Can Not be same as Old Password';
      }

      await knex('user').where('email', '=', args.email).update({
        password: args.newPassword,
      });
      const res = await knex('user').where('email', args.email);
      return res[0];
    },
  },
};

export { resolvers };
