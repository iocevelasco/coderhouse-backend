const express = require('express')
const app = express()
const multer = require('multer')
const fs = require('fs')

app.use(express.urlencoded({ extended: false }));

const diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.originalname.endsWith('.png')) callback(null, 'images');
    else callback(null, 'otros')
  },
  filename: (req, file, callback) => {
    const nombreDeFile = file.originalname;
    callback(null, nombreDeFile);
  }
});

const uploaderMiddleware = multer({ storage: diskStorage });


const notFoundProductMiddleware = async (req, res, next) => {
  const id = req.params.id
  const content = await fs.promises.readFile("./productos.txt", 'utf-8')
  const items = JSON.parse(content)
  if(id){
    if(Array.isArray(items)){
      const item = items.find(element => element.id == id);
      if(item) next()
      else {
        next(res.send({message: 'Product not found'}).status(404))
      }
    }
  }
}

module.exports = {
  uploaderMiddleware,
  notFoundProductMiddleware
}