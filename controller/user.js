const { exec } = require("../db/mysql")

const loginCheck = (username, password) => {
    let sql = `select * from users where username='${username}' and password='${password}' `
    const result = exec(sql)
    
    return result
}

module.exports={loginCheck}