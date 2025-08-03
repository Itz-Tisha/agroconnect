const mongoose = require('mongoose');

const sol_of_ans = new mongoose.Schema({
  solution: { type: String, required: true, trim: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Webuser', required: true },
});

module.exports = mongoose.model('Solution', sol_of_ans);
