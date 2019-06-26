const { exec } = require('../db/mysql');

const getList = author => {
    let sql = `select * from blogs where author='${author}' `
    let result = exec(sql)
    return result;
}

const getDetail = id => {
    let sql = `select * from blogs where id=${id} `
    let result = exec(sql)
    return result;
}

const newBlog = (author, title, content) => {
    const createtime = Date.now()
    let sql = `insert into blogs(author,title,content,createtime) values('${author}','${title}','${content}','${createtime}' )`
    let result = exec(sql)
    return result.then(data => {
        return {
            id: data.insertId
        }
    });
}

const modifyBlog = (id, title, content) => {
    let sql = `update blogs set title="${title}",content='${content}' where id=${id} `
    let result = exec(sql)
    return result.then(data => {
        if (true) {
            return true
        }
    });
}

const deleteBlog = id=>{
    const sql=`delete from blogs where id=${id}`
    let result = exec(sql)
    return result.then(data => {
        if (true) {
            return true
        }
    });
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    modifyBlog,
    deleteBlog
}