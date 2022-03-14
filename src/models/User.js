/** @format */

const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, default: null },

  age: { type: Number, default: null },
  password: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

// const UserModel = model('users', UserSchema);
// module.exports = UserModel;
export const UserModel = model('users', UserSchema);
