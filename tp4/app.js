const createError = require('http-errors');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080
const indexRouter = require('./routes/index');
const productsRoute = require('./routes/products');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/products', productsRoute);


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.listen(PORT, (err)=>{
  if(err) console.error("Error in server setup")
  console.info("Server listening on port", PORT)
 })


