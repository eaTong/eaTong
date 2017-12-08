/**
 * Created by eatong on 17-12-8.
 */

import mongoose, {Schema} from '../mongoConfig';

const VisitLogSchema = new Schema({
  ip: {type: String},
  userAgent: {type: String},
  time: {type: Date},
  blog: {type: String, ref: 'blog'}
});

export default mongoose.model('visitLog', VisitLogSchema);
