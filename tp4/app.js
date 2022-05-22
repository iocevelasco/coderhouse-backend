const createError = require('http-errors')
const express = require('express')
const PORT = process.env.PORT || 8080
const productsRoute = require('./routes/products')
const router = express.Router()
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json())

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname,'./form.html'))
})

app.use('/api/products', productsRoute);

router.use((error, req, res, next)=>{
  res.send('Something is wrong')
  console.log(error)
})

app.use(function(req, res, next) {
  next(createError(404));
});
 
app.listen(PORT, (err)=>{
  if(err) console.error("Error in server setup")
  console.info("Server listening on port", PORT)
 })


