/**
 * Created by eatong on 17-12-8.
 */

const {mongoose, Schema} = require ('../mongoConfig');

const VisitLogSchema = new Schema({
  ip: {type: String},
  userAgent: {type: String},
  browser: {type: String},
  version: {type: Number},
  url: {type: String},//路径
  spentTime: {type: Number},//访问时间
  visitTime: {type: Date},//耗时
});

module.exports =mongoose.model('visitLog', VisitLogSchema);
