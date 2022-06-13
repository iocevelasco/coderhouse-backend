const fs = require('fs');
const { collapseTextChangeRangesAcrossMultipleVersions } = require('typescript');
const { v4: uuidv4 } = require('uuid');

module.exports = class Container {
  constructor(file){
    this.file = file
  }
  static ID = 0
  static content = {}
   
  writeCart = async (products) => {
    try{
      return await fs.promises.writeFile(this.file, JSON.stringify(products))
    }catch(err){
      console.error('[WRITE ERROR]',err)
    }
  }
  
  
  readCarts = async () => {
    try{
      const content = await fs.promises.readFile(this.file, 'utf-8')
      return JSON.parse(content)
    }catch(err){
      console.error('[READ ERROR]',err)
    }
   }
  
   async create(){
    try{
      const id = ++Container.ID 
      const allCarts = await this.readCarts()
      const carts = {...allCarts, [id]: []}
      await this.writeCart(carts)
      return id
    }
    catch(err){
      console.error('[CREATE CART ERROR]',err)
    }
   }

   async getAll(){
    try{
      const content = await this.readCarts()
      return content
    }
    catch(err){
      console.error('[GET ALL ERROR]',err)
    }
  }

  async saveProduct(cartId, product){
    try{

      product.id = uuidv4()
      product.timestamps = new Date()

      const allCarts = await this.readCarts()
      const cart = allCarts[cartId]
      cart.push(product)

      await this.writeCart(allCarts)
    }
    catch(err){
      console.error('[SAVE ERROR]',err)
    }
  }
  async deleteCart(cartId){
    let success = 1
    const carts = await this.readCarts()
    for(let key in carts){
      if(key === cartId) {
        delete carts[key]
        await this.writeCart(carts)
        return success
      } 
    }
  }

  async deleteProducts(cartId, productId){
    try{
      let success = 1
      const carts = await this.readCarts()

      const currentCard = carts[cartId]
      const isAValidProduct = currentCard.find(element => element.id == productId)

      
      if(isAValidProduct){
        const filteredCard = currentCard.filter(element => element.id !== productId)
        carts[cartId] = filteredCard
        await this.writeCart(carts)
        return success
      }
      if(isAValidProduct){
        return !success
      }

    }
    catch(err){
    console.error('[SAVE ERROR]',err)
    }
  }
}