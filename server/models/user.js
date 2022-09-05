const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})
const User = mongoose.model('User', userSchema);

exports.User = User; 

//module.exports = mongoose.model('user', userSchema)