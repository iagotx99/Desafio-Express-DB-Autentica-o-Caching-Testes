require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const nodeCache = require('node-cache');
const redis = require('redis');

const clientesRouter = require('./routes/clientes');
const produtosRouter = require('./routes/produtos');
const usuariosRouter = require('./routes/usuarios');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', (req, res) => res.render('index'));
app.use('/clientes', clientesRouter);
app.use('/produtos', produtosRouter);
app.use('/usuarios', usuariosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
