const express = require('express');
const router = express.Router();
const { notFoundProductMiddleware, uploaderMiddleware } = require('../middleware')
const Container = require('../../tp2');

const products = new Container("productos.txt")

/** GET product listing */
router.get('/', async (req, res) => {
  try{
    const items = await products.getAll()
    if(Array.isArray(items))res.send({items}).status(200);
  }catch(err){
    console.log('[ERROR GET PRODUCTS]', err)
  }
});

/** 
 * GET product by id 
 * @param {string} id - The product ID.
 * */
router.get("/:id", notFoundProductMiddleware, async (req,res)=>{
  const id = req.params.id
  try{
    const items = await products.getAll()
    if(Array.isArray(items)){
      const item = items.find(element => element.id == id);
      res.json({products: item, message: 'Success'}).status(200)
    }
  }catch(err){
    console.log('[ERROR GET PRODUCT BY ID]', err)
  }
})

/** 
 * POST create product 
 * @bodyParam {object} product
 * @bodyParam {string} product.name
 * @bodyParam {int} product.price
 * @bodyParam {string} product.thumbnail
 * */
router.post('/', uploaderMiddleware.single('file'), async (req, res) => {
  try{
    const newProduct = req.body
    const productId = await products.save(newProduct)
    res.send({products:productId}).status(200);
  }catch(err){
    console.log('[ERROR POST PRODUCTS]', err)
  }
});

/** 
 * EDIT product 
 * @param {string} id - The product ID.
 * */
router.put('/:id',notFoundProductMiddleware, async (req, res, next) => {
  try{
    const id = req.params.id
    const newData = req.body
    const data = await products.getAll()
    const productList = data.map(element => {
      if( parseFloat(element.id) === parseFloat(id)){
        return {
          id: element.id,
          ...newData
        }
      }else {
        return element
      }
    })
    await products.writeProducts(productList)

    const productId = await products.readAllProducst()
    res.send({
      products:productId, 
      message: 'Product update succefully'
    }).status(200);
  }catch(err){
    console.log('[ERROR POST PRODUCTS]', err)
  }
});


/** 
 * DELETE product 
 * @param {string} id - The product ID.
 * */
router.delete('/:id',async (req, res, next) => {
  try{
    const id = req.params.id
    const data = await products.getAll()
    const productList = data.filter(element => element.id == id)
    await products.writeProducts(productList)
    res.send({message: 'Delete succefully'}).status(200);
  }catch(err){
    console.log('[ERROR POST PRODUCTS]', err)
  }
});


module.exports = router;
