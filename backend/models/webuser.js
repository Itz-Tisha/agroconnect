const mongo = require('mongoose');
const user = new mongo.Schema({
    name:{type:String ,required:true, trim:true,maxLength:20},
    email:{type:String ,required:true, trim:true,unique:true},
    password:{type:String ,required:true, trim:true},
     usertype: {
    type: String,
    required: true,
    enum: ['farmer', 'expert'], 
    default: 'farmer'
  },
    image:{type:String ,required:true, trim:true},
})

module.exports = mongo.model('Webuser',user);