/*
  mongoose操作:https://cnodejs.org/topic/548e54d157fd3ae46b233502
*/
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  id:String,
  user_id: String,
  user_name: String,
  password: String,
})
const User = mongoose.model('users', schema)
module.exports = User
