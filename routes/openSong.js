var express = require('express');
var router = express.Router();
var path = require('path')
var pool = require('../db/mysql')

//播放歌曲api

router.get('/',(req,res,next)=>{
    let {songs_id} = req.query
    console.log(songs_id);
    const sql = 'SELECT * FROM songs WHERE songs_id = ?'

    pool.getConnection((err,connection)=>{
        if(err){
            console.log(err);
            res.status(500).send({
                msg:'服务器错误'
            })
            return
        }
        connection.query(sql,[songs_id],(err,result)=>{
         if(err){
            console.log(err);
            return
         }
         connection.release()
        if(result.length>0){
           
            const filePath = path.join(__dirname,'\../music/')
            const fileName = result[0].artist+' - '+result[0].title+'.mp3'
            //console.log(filePath+fileName)
            res.sendFile(filePath+fileName, (err) => {
                //console.log(filePath+fileName);
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal server error');
                } else {
                    console.log('File sent successfully');
                }
            })
        }
        else{
            res.send({
                code:000,
                msg:'抱歉,未找到相关信息',
                success:false
            })
        }
    })

    })
    
   
})
module.exports = router;
