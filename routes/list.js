var express = require('express');
var router = express.Router();
const {checkToken}=require('../utils/auth')
const dataCtrl = require('../controllers/list.controller');
/* GET users listing. */
router.post('/getList',checkToken,dataCtrl.getList) ;

module.exports = router;
