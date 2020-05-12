/*
  mongoose操作:https://cnodejs.org/topic/548e54d157fd3ae46b233502
*/
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');//分页
const schema = new mongoose.Schema({
  id:String,
  name: String,
  img: String,
  price:Number,
  stars:Object,
  num:Number,
  ischeck:Boolean
})
schema.plugin(mongoosePaginate);
const List = mongoose.model('lists', schema)
module.exports = List
