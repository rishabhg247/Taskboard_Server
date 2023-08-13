const { Schema } = require('mongoose');

const listSchema = new Schema({
  username: Schema.Types.String,
  lists: [{
    name: Schema.Types.String,
    tasks: [{ text: Schema.Types.String, completed: Schema.Types.Boolean }]
  }]
});

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = { listSchema, userSchema };