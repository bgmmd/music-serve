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

  pool.getConnection((err,connection)=>{
    if(err){
      console.log(err);
      return
    }
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
           //用户存在，判断密码是否正确
           pool.getConnection((err,connection)=>{
            if(err){
              res.status(500).send('db连接错误')
              console.log(err);
              return
            }
            connection.query(sqlPwd,[userPwd],(err,result)=>{
              if(err){
                console.log('db connect err'+err);
                res.status(500).send('数据库查询错误')
                return
              }
              connection.release()
              if(result.length>0){
                //密码存在
                res.status(200).send({
                  code:200,
                  msg:'登陆成功',
                  success:true,
                  data:result[0]
                })
              }
              else{
                //密码错误
                res.status(401).send({
                  code:401,
                  msg:'密码错误'
                })
              }
            })
           })
      }
      else{
        //用户不存在】
        res.status(404).send({
          code:404,
          msg:'用户不存在'
        })
      }
    });
  })
  
});
module.exports = router;
