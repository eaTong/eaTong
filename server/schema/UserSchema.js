/**
 * Created by eatong on 17-11-28.
 */
const {mongoose, Schema} = require ('../mongoConfig');

const UserSchema = new Schema({
  account: String,
  password: String,
  admin: Boolean,
});

module.exports =mongoose.model('user', UserSchema);
