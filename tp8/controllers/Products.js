module.exports = class Container {
  constructor(file){
    this.file = file
  }
  static ID = 0
  static content = []
   
  static generateId(element){
    return element.id = ++Container.ID 
  }

  writeProducts = async (products) => {
    try{
      return await fs.promises.writeFile(this.file, JSON.stringify(products))
    }catch(err){
      console.error('[WRITE ERROR]',err)
    }
  }
  
  
  readAllProducst = async () => {
    try{
      const content = await fs.promises.readFile(this.file, 'utf-8')
      return JSON.parse(content)
    }catch(err){
      console.error('[READ ERROR]',err)
    }
   }

  async save(newElement){
    try{
      const id = ++Container.ID 
      const productList = Container.content
      newElement.id = id
      productList.push(newElement)
      await this.writeProducts(Container.content)
      const products = await this.readAllProducst()
      return newElement.id
    }
    catch(err){
      console.error('[SAVE ERROR]',err)
    }
  }

  async getById(id){
    try{
      const products = await this.readAllProducst()
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
      const content = await this.readAllProducst()
      return content
    }
    catch(err){
      console.error('[GET ALL ERROR]',err)
    }
  }

  async deleteById(id){
    try{
      const products = await this.readAllProducst()
      if(Array.isArray(products)&& typeof id == 'number'){
        const productListUpdated = products.filter(e => e.id !== id)
        await this.writeProducts(productListUpdated)
        return productListUpdated
      }
    }
    catch(err){
      console.error('[DELETE BY ID ERROR]',err)
    }
  }
  async deleteAll(){
    try{
      await fs.writeFile(this.file, '',  () => console.log('DELETE SUCCESS'))
    }
    catch(err){
      console.error('[DELETE ALL ERROR]',err)
    }
  }
}