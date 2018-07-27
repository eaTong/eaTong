
/**
 * Created by eaTong on 2018-27-07 .
 * Description: auto generated in  2018-27-07
 */

const {mongoose, Schema} = require('../mongoConfig');

const TestSchema = new Schema({
  name: String,
  enable: Boolean,
});

module.exports = mongoose.model('test', TestSchema);
