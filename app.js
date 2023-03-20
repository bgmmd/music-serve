var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//导入接口文件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getSongsRouter = require('./routes/getSongs')// 获取歌曲api
var openSongRouter = require('./routes/openSong') //播放歌曲api

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));//已经内置的中间件，用于解析post请求参数
app.use(cookieParser());
//app.use('/Songs',express.static(path.join(__dirname, 'music')));

// 注册相应的路径
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/getSongs', getSongsRouter);
app.use('/openSong',openSongRouter)

//app.use('/test', testRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type,token')
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method == 'OPTIONS') res.sendStatus(200) //让options尝试请求快速结束
  else next()
}
)
module.exports = app;
