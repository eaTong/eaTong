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
  history: Array,
  keywords: Array,
  published: Boolean,
  isMarkdown: Boolean,
});

module.exports = mongoose.model('blog', BlogSchema);
