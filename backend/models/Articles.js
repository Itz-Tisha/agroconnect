const mongo = require('mongoose');
const artcls = new mongo.Schema({
    title: { type: String, required: true, trim: true, maxLength: 100 },
    content: { type: String, required: true, trim: true },
   // image: { type: String, required: true, trim: true },
    user: { type: mongo.Schema.Types.ObjectId, ref: 'Webuser', required: true },
   // like:{ type: Number, default: 0 },
})

module.exports = mongo.model('Articles', artcls);