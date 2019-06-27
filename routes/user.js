var express = require('express');
var router = express.Router();
const {loginCheck} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../resModel/model')

/* GET home page. */
router.post('/login', function(req, res, next) {
  console.log(req.session)
  const result = loginCheck(req.body.params.username,req.body.params.password)
  result.then(data=>{
    if(data.length){
      req.session.username = data[0].username;
      req.session.realname = data[0].realname;
      data='登陆成功';
      res.json(new SuccessModel(data))
    }else{
      data='请先注册';
      res.json(new ErrorModel(data))
    }
  })
});


// router.get('/login-test',(req,res,next)=>{
//   console.log(req.session)
//   if(req.session.username){
//     res.json({
//       error:0,
//       msg:'登录过了'
//     })
//     return
//   }
//   res.json({
//     error:-1,
//     msg:'未登录'
//   })
// })

module.exports = router;
