const fs = require('fs')
const express = require('express');
const app = express()
const PORT = process.env.PORT || 8080

const readAllProducst = async () => {
  try{
    const content = await fs.promises.readFile('productos.txt', 'utf-8')
    return JSON.parse(content)
  }catch(err){
    console.error('[READ ERROR]',err)
  }
 }

app.get("/products", async (req,res)=>{
  try{
    const items = await readAllProducst()
    if(Array.isArray(items))res.json({products: items, message: 'Success'}).status(200)
    else res.json({products: [], message: 'Product list empty'}).status(204)
  }catch(err){
    console.log('[ERROR GET PRODUCTS]', err)
  }
})

app.get("/productoRandom", async (req,res)=>{
  try{
    const items = await readAllProducst()
    if(Array.isArray(items)){
      const item = items[Math.floor(Math.random() * items.length)];
      res.json({products: item, message: 'Success'}).status(200)
    }
    else res.json({products: [], message: 'Product list empty'}).status(204)
  }catch(err){
    console.log('[ERROR GET RANDOM PRODUCT]', err)
  }
})

app.listen(PORT, (err)=>{
 if(err) console.error("Error in server setup")
 console.info("Server listening on port", PORT)
})