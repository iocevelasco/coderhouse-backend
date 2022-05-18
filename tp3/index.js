const fs = require('fs')
const express = require('express');
const app = express()
const PORT = process.env.PORT || 8080
const products = require('../tp2')

app.get("/products", async (req,res)=>{
  try{
    const items = await products.getAll()
    if(Array.isArray(items))res.json({products: items, message: 'Success'}).status(200)
    else res.json({products: [], message: 'Product list empty'}).status(204)
  }catch(err){
    console.log('[ERROR GET PRODUCTS]', err)
  }
})

app.get("/productoRandom", async (req,res)=>{
  try{
    const items = await products.getAll()
    if(Array.isArray(items)){
      const item = items[Math.floor(Math.random() * items.length)];
      res.json({products: item, message: 'Success'}).status(200)
    }else res.json({products: [], message: 'Product list empty'}).status(204)
  }catch(err){
    console.log('[ERROR GET RANDOM PRODUCT]', err)
  }
})

app.listen(PORT, (err)=>{
 if(err) console.error("Error in server setup")
 console.info("Server listening on port", PORT)
})