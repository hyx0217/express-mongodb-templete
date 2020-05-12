const List = require('../models/list.model')
const { createToken } = require('../utils/auth')
var jwt = require('jsonwebtoken')
module.exports = {
  getList: function (req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var size= req.body.size ? req.body.size : 10;
    List.paginate({},{page:page,limit:size},(err,data)=>{
      res.json({ code: 1,data:{list:data.docs,total:data.total}, msg: '获取成功' })
    })
  }
}
