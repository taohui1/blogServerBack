var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, modifyBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../resModel/model')
const loginor = require('../middleware/loginor')

/* 博客列表 */
router.get('/list', function (req, res, next) {
  console.log(req.session)
  const result = getList(req.query.author);
  result.then(data => {
    res.json(new SuccessModel(data))
  })
});

/* 博客详情 */
router.get('/detail', function (req, res, next) {
  console.log(req.session)
  const result = getDetail(req.query.id);
  result.then(data => {
    res.json(new SuccessModel(data))
  })
});

/* 新建博客 */
router.post('/newBlog', function (req, res, next) {
  const result = newBlog(req.body.params.author, req.body.params.title, req.body.params.content);
  result.then(data => {
    data = '新建成功'
    res.json(new SuccessModel(data))
  })
});

/* 修改博客 */
router.post('/modifyBlog', function (req, res, next) {
  const result = modifyBlog(req.body.params.id, req.body.params.title, req.body.params.content);
  result.then(data => {
    data = '修改成功'
    res.json(new SuccessModel(data))
  })
});

/* 删除博客 */
router.post('/deleteBlog', function (req, res, next) {
  const result = deleteBlog(req.body.params.id);
  result.then(data => {
    data = '删除成功'
    res.json(new SuccessModel(data))
  })
});

module.exports = router;
