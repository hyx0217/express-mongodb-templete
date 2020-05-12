const mongoose = require('mongoose')
const User = require('../models/user.model')
const { createToken } = require('../utils/auth')
var jwt = require('jsonwebtoken')
module.exports = {
  //登录
  login: function (req, res, next) {
    let { userName, password } = req.body
    User.find({ user_name:userName, password }).then((data) => {
      if (data.length === 0) {
        res.json({ code: -1,data:'', msg: '用户名或密码错误' })
      } else {
        const token=createToken(userName)
        data[0].token=token;
        data[0].save()
        delete data[0].password
        res.json({code:1,msg:'登录成功',data:data[0]})
      }
    })
  },
  //注册
  register: function (req, res, next) {
    let { userName, password } = req.body
    // const id = mongoose.Types.ObjectId()
    User.find({ user_name:userName }).then((data) => {
      if (data.length > 0) {
        res.json({ code: -1, msg: '用户名已存在',data:'' })
        return
      }
      //注册生成user_id
      const user_id = mongoose.Types.ObjectId()
      // const token = createToken(userName)
      const user = new User(Object.assign( {user_name:userName,password, user_id}))
      user.save().then((data) => {
        res.json({
          code: 1,
          msg: '注册成功',
          data: '',
        })
      })
    })
  },
  
}
