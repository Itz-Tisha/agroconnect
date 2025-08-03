const mongo = require('mongoose');
const post = new mongo.Schema({
   title:{ type: String, required: true, trim: true, maxLength: 100 },
   content:{ type: String, required: true, trim: true },
   //image:{ type: String, required: true, trim: true },
   status:{type:Boolean, default:false},
    user: { type: mongo.Schema.Types.ObjectId, ref: 'Webuser', required: true }
});
module.exports = mongo.model('Post', post);