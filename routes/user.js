var express = require('express');
var router = express.Router();
const {checkToken}=require('../utils/auth')
const dataCtrl = require('../controllers/user.controller');

/* GET users listing. */
router.post('/findUser',checkToken,dataCtrl.findUser)
router.get('/:id',checkToken,dataCtrl.get) ;
router.post('/public/login',checkToken,dataCtrl.login) ;
router.post('/public/register',checkToken,dataCtrl.register) ;
router.put('/address/:id',checkToken,dataCtrl.address)
router.put('/cates/:id',checkToken,dataCtrl.cates)
router.put('/editcates/:id',checkToken,dataCtrl.editcates)

module.exports = router;
