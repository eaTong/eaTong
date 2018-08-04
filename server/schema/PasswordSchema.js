/**
 * Created by eaTong on 2018-04-08 .
 * Description: auto generated in  2018-04-08
 */

const {mongoose, Schema} = require('../mongoConfig');

const PasswordSchema = new Schema({
  name: String,
  address: String,
  account: String,
  password: String,
  remark: String,
  enable: Boolean,
});

module.exports = mongoose.model('password', PasswordSchema);
