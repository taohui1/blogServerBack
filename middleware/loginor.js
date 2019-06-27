const { SuccessModel, ErrorModel } = require('../resModel/model')

module.exports=(req,res,next)=>{
    if(req.session.username){
        next()
        return
    }
    res.json(new ErrorModel("请先登录"))
}