/**
 * Created by eatong on 17-11-16.
 */
import mongoose, {Schema} from '../mongoConfig';

const BlogSchema = new Schema({
  title: String,
  content: String,
  info: String,
  viewCount: Number,
  publishTime: Date,
  history: Array
});

export default mongoose.model('blog', BlogSchema);
