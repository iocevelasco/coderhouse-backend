const express = require('express');
const router = express.Router();
const Container = require('../controllers/cart') 

const cart = new Container("productos.txt")

/** 
 * POST create cart 
 * */
 router.post('/', async (req, res) => {
  try{
    const cartId = await cart.create()
    res.send({cartId:cartId}).status(200);
  }catch(err){
    console.log('[ERROR POST CART]', err)
  }
});

/** 
 * DELETE by ID cart 
 * @param {number} id - Cart ID.
 * */
router.delete('/:id', async (req, res)=> {
  const cartId = req.params.id
  try{
    const deleteCart = await cart.deleteCart(cartId)
    if(deleteCart) res.send({message:'success'}).status(200)
    if(!deleteCart) res.send({message:'error'}).status(404)
  }catch(err){
    console.log('[ERROR DELETE CART]', err)
  }
})

/** 
 * GET ALL carts 
 * */
router.get('/', async (req, res) => {
  try{
    const carts = await cart.getAll()
    res.send(carts).status(200);
  }catch(err){
    console.log('[ERROR POST PRODUCTS]', err)
  }
});


/** 
 * POST create cart 
 * @param {number} id - Cart ID.
 * @param req.body {Object} The JSON payload.
 * */
 router.post('/:id/products', async (req, res) => {
  const cartId = req.params.id
  const newProduct = req.body
  try{
    await cart.saveProduct(cartId, newProduct)
    res.send({cartId:cartId}).status(200);
  }catch(err){
    console.log('[ERROR POST CART]', err)
  }
});


/** 
 * DELETE product 
 * @param {string} id - Cart ID.
 * @param {string} products_id Products id 
 * */
 router.delete('/:id/products/:products_id', async (req, res) => {
  const cartId = req.params.id
  const productId = req.params.products_id

  try{
    const removeProduts = await cart.deleteProducts(cartId, productId)
    if(removeProduts)res.send({message:'success'}).status(200)
    if(!removeProduts)res.send({message:'error'}).status(404)

  }catch(err){
    console.log('[ERROR POST CART]', err)
  }
});

module.exports = router;

