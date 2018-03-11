/**
 * Created by eatong on 17-11-16.
 */
const {mongoose, Schema} = require('../mongoConfig');

const CommentSchema = new Schema({
  content: String,
  ip: String,
  time: Date,
  nickname: String,
  email: String,
  website: String,
  blog: {type: Schema.Types.ObjectId, ref: 'blog'}

});

module.exports = mongoose.model('comment', CommentSchema);
