/**
 * Created by eatong on 17-11-28.
 */
import mongoose, {Schema} from '../mongoConfig';

const UserSchema = new Schema({
  account: String,
  password: String,
  admin: Boolean,
});

export default mongoose.model('User', UserSchema);
