/**
 * Created by eatong on 17-11-16.
 */
const {mongoose, Schema} = require('../mongoConfig');

const BlogSchema = new Schema({
  title: String,
  content: String,
  publishedContent: String,
  info: String,
  viewCount: Number,
  publishTime: Date,
  keywords: Array,
  published: Boolean,
  isMarkdown: Boolean,
  comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});

module.exports = mongoose.model('blog', BlogSchema);
