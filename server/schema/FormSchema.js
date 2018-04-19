/**
 * Created by eatong on 17-11-4.
 */
const {mongoose, Schema} = require('../mongoConfig');

const FormSchema = new Schema({
  text: String,
  textarea: String,
  float: Number,
  int: Number,
  deleted: Boolean
});

module.exports = mongoose.model('form', FormSchema);
