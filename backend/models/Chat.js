const mongo = require('mongoose');
const chat = new mongo.Schema({
   message:{ type: String, required: true, trim: true, maxLength: 100 },
   expuser: { type: mongo.Schema.Types.ObjectId, ref: 'Webuser', required: true },
   user: { type: mongo.Schema.Types.ObjectId, ref: 'Webuser', required: true }
});
module.exports = mongo.model('Chat', chat);