const mongoose = require('mongoose')
const User = require('../models/user.model')
const request = require('request')
const { checkToken, createToken } = require('../utils/auth')

var jwt = require('jsonwebtoken')
module.exports = {
  findUser: function (req, res, next) {
    let options = {
      method: 'POST',
      url: 'https://api.weixin.qq.com/sns/jscode2session?',
      formData: {
        appId: 'wxe40708a721b67cba',
        secret: '37ff983fb5172cd7ece6f9b566249e3c',
        js_code: req.body.code,
        grant_type: 'authorization_code',
      },
    }
    //生成token
    request(options, (error, response, body) => {
      let _data = JSON.parse(body)
      let token = jwt.sign(_data, 'shhhhh', { expiresIn: '1h' }) //根据微信服务返回的session_key和openid生成token
      let user = new User({
        openid: _data.openid,
        token: token,
      })
      //保存用户唯一标识到数据库
      user.save().then((data) => {
        console.log(data)
      })

      res.json({
        token: token,
      })
    })
  },
  get: function (req, res, next) {
    var id = req.params.id
    User.findOne({ user_id: id }).then((data) => {
      const _data = {
        user_id: data.user_id,
        user_name: data.user_name,
      }
      res.json({ code: 1, data:_data, msg: '获取成功' })
    })
  },
  //登录
  login: function (req, res, next) {
    let { user_name, password } = req.body
    User.find({ user_name, password }).then((data) => {
      if (data.length === 0) {
        res.json({ code: -1, msg: '用户名或密码错误' })
      } else {
        const token=createToken(user_name)
        data[0].token=token;
        data[0].save()
        delete data[0].password
        res.json({code:1,msg:'登录成功',data:data[0]})
      }
    })
  },
  //注册
  register: function (req, res, next) {
    let { user_name, password, token } = req.body
    // const id = mongoose.Types.ObjectId()
    User.find({ user_name }).then((data) => {
      if (data.length > 0) {
        res.json({ code: -1, msg: '用户名已存在' })
        return
      }
      //注册生成user_id
      const user_id = mongoose.Types.ObjectId()
      const token = createToken(user_name)
      const user = new User(Object.assign(req.body, { user_id,token }))
      user.save().then((data) => {
        res.json({
          code: 1,
          msg: '注册成功',
          data: { user_id, user_name, token },
        })
      })
    })
  },
  address: function (req, res, next) {
    var id = req.params.id
    User.findByIdAndUpdate(
      id,
      { U_address: req.body.U_address },
      { new: true }
    ).then((data) => {
      res.json(data)
    })
  },
  cates: function (req, res, next) {
    var id = req.params.id
    //查找到用户，克隆购物车数组，在修改购物车数组
    User.findById(id).then((data) => {
      let arr = data.U_cates.concat()
      //判断购物车里是否存在改商品，存在+上购买数量，不存在添加
      if (arr.length == 0) {
        arr.push(req.body.U_cates)
      } else {
        var i = 0
        for (i = 0; i < arr.length; i++) {
          if (arr[i].id == req.body.U_cates.id) {
            arr[i].num = +arr[i].num + req.body.U_cates.num
            break
          }
        }
        if (i == arr.length) {
          arr.push(req.body.U_cates)
        }
      }
      User.findByIdAndUpdate(id, { U_cates: arr }, { new: true }).then(
        (data) => {
          res.json(data)
        }
      )
    })
  },
  editcates: function (req, res, next) {
    var id = req.params.id
    User.findByIdAndUpdate(id, { U_cates: req.body }, { new: true }).then(
      (data) => {
        res.json(data)
      }
    )
  },
  //购买后删除购物车里选中的商品
  delcates: function (req, res, next) {
    var id = req.params.id
    User.findByIdAndUpdate(id, { U_cates: req.body }, { new: true }).then(
      (data) => {
        res.json(data)
      }
    )
  },
}
