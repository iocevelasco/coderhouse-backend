const fs = require('fs')


const writeProducts = async (products) => {
  try{
    return await fs.promises.writeFile('productos.txt', JSON.stringify(products))
  }catch(err){
    console.error('[WRITE ERROR]',err)
  }
}


const readAllProducst = async () => {
  try{
    const content = await fs.promises.readFile('productos.txt', 'utf-8')
    return JSON.parse(content)
  }catch(err){
    console.error('[READ ERROR]',err)
  }
 }

class Container {
  static ID = 0
  static content = []
   
  static generateId(element){
    return element.id = ++Container.ID 
  }

  async save(newElement){
    try{
      const id = ++Container.ID 
      const productList = Container.content
      newElement.id = id
      productList.push(newElement)
      await writeProducts(Container.content)
      const products = await readAllProducst()
      return newElement.id
    }
    catch(err){
      console.error('[SAVE ERROR]',err)
    }
  }

  async getById(id){
    try{
      const products = await readAllProducst()
      if(Array.isArray(products)){
        const result = products.find(e => e.id == id)
        return result
      }
    }
    catch(err){
      console.error('[GET BY ID ERROR]',err)
    }
  }

  async getAll(){
    try{
      return await readAllProducst()
    }
    catch(err){
      console.error('[GET ALL ERROR]',err)
    }
  }

  async deleteById(id){
    try{
      const products = await readAllProducst()
      if(Array.isArray(products)&& typeof id == 'number'){
        const productListUpdated = products.filter(e => e.id !== id)
        await writeProducts(productListUpdated)
        return productListUpdated
      }
    }
    catch(err){
      console.error('[DELETE BY ID ERROR]',err)
    }
  }
  async deleteAll(){
    try{
      await writeProducts([])
    }
    catch(err){
      console.error('[DELETE ALL ERROR]',err)
    }
  }
}

const product1 = {title: 'Paper', price: 12344, thumbnail: 'kk'}
const product2 = {title: 'Table', price: 12344, thumbnail: 'kk'}
const product3 = {title: 'Phone', price: 12344, thumbnail: 'kk'}

new Container().save(product1)
new Container().save(product2)
new Container().save(product3)
new Container().getById(1)
new Container().deleteById(2)
new Container().getAll()
