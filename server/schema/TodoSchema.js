/**
 * Created by eatong on 17-11-4.
 */
import mongoose, {Schema} from '../db';

const TodoSchema = new Schema({
  name: String,
  completed: Boolean
});

export default mongoose.model('Todo', TodoSchema);
