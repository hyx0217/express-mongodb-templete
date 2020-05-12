var express = require('express');
var router = express.Router();
const {checkToken}=require('../utils/auth')
const dataCtrl = require('../controllers/user.controller');

/* GET users listing. */
router.post('/public/login',checkToken,dataCtrl.login) ;
router.post('/public/register',checkToken,dataCtrl.register) ;

module.exports = router;
