var express = require('express');
var router = express.Router();
const {loginCheck} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../resModel/model')

/* GET home page. */
router.post('/login', function(req, res, next) {
  const result = loginCheck(req.body.params.username,req.body.params.password)
  result.then(data=>{
    console.log(data)
    if(data.length){
      req.session.username = data.username;
      req.session.realname = data.realname;
      data='登陆成功';
      res.json(new SuccessModel(data))
    }else{
      data='请先注册';
      res.json(new ErrorModel(data))
    }
  })
});

module.exports = router;
