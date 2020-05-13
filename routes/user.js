var express = require('express');
var router = express.Router();
const {checkToken}=require('../utils/auth')
const dataCtrl = require('../controllers/user.controller');
/* GET users listing. */
router.post('/login',dataCtrl.login) ;
router.post('/register',dataCtrl.register) ;
router.post('/forget',dataCtrl.forget) ;
router.post('/getUser',checkToken,dataCtrl.getUser) ;



module.exports = router;
