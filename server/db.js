/**
 * Created by eatong on 17-11-4.
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', (error) => {
  console.log('error when connect to mongodb', error);
});
db.once('open', () => {
  console.log('Success connected to mongodb');
});
const Schema = mongoose.Schema;
export default mongoose;
export {Schema};
