var express = require("express");
const pool = require("../db/mysql");
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//密码登录 api
router.post("/loginpwd", (req, res, next) => {
  const { userTel, userPwd } = req.body;
  const sqlTel = "select * from user where tel = ?";
  const sqlPwd = "select * from user where pwd = ?";

  connection.query(sqlTel, [userTel], (e, result) => {
    connection.release();// 释放连接
    if (e) {
      console.error("Error querying database:", err);
      res.status(500).json({
        message: "服务器错误",
      });
      return;
    }
    if(result.length>0){

    }
  });
});
module.exports = router;
