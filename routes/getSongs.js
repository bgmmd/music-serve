var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
var pool = require('../db/mysql');


//查找歌曲api
router.post('/', (req, res, next) => {
    let { keyword } = req.body
    // 去数据库中查询相应的歌曲,参数化查询
    const sql = 'SELECT * FROM songs WHERE title LIKE ? OR artist LIKE ?';
    const params = [`%${keyword}%`, `%${keyword}%`];

    pool.getConnection((err,connection)=>{
        if (err) {
            console.error('Error getting connection:', err);
            res.status(500).json({
              message: '服务器错误',
            });
            return;
          }
        
    connection.query(sql, params, (error, results) => {
        //console.log(results.length)
        connection.release()//释放连接
        if (error) console.log(error)
        if (results.length > 0) {
            res.status(200).send({
                code: 200,
                msg: '查找成功',
                success: true,
                data: results
            })
        }
        else {
            res.status(404).send({
                code: 404,
                msg: '抱歉,未找到相关信息',
                success: false
            })
        }
    })
    })
    


})
module.exports = router