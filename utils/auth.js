const { AUTH_SECRET } = require('./config')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
module.exports = {
  //根据用户名(唯一）生成token,设置24小时过期时间
  createToken(name) {
    return jwt.sign({ name }, AUTH_SECRET, { expiresIn: '24h' })
  },
  /* 
    验证token是否正确
    设置请求白名单，不需要token
  */
  checkToken(req, res, next) {
    //定义public接口为白名单地址，不需要token
    try {
      if (req.originalUrl.includes('/public')) {
        return next()
      } else {
        if (req.header('Authorization')) {
          const token = req.header('Authorization').split(' ')[1]
          let name
          try {
            name = jwt.verify(token, AUTH_SECRET).name;
          } catch (error) {
            return res.status(401).json({code:401,msg:'token无效'})
          }
          User.find({ user_name: name, token }).then((data) => {
            if (data.length === 0) {
             return res.status(401).json({ code: 401, msg: '登录过期，请重新登录' })
            }
          })
        } else {
          return res.status(401).json({ code: 401, msg: 'No Authorization was found' })
        }
      }
     return next()
    } catch (error) {
      console.log(error)
    }
  },
}
