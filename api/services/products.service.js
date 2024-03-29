const faker = require('@faker-js/faker');


class ProductsService{

  _productServiceInstance = null;

  constructor(){
    this.products = [];
    this.generate();
  }

  getInstance(){
    if (this._productServiceInstance === null){
      this._productServiceInstance = new ProductsService();
    }
  }

  generate(){
    const amountProducts = 10;

    for (let i = 0; i < amountProducts; i++){
      this.products.push({
        id: faker.faker.string.uuid(),
        name: faker.fakerES.commerce.product(),
        price: parseFloat(faker.fakerES.commerce.price({min: 10, max: 1000})),
        stock: faker.simpleFaker.number.int({min: 1,  max: 50}),
        image: faker.fakerES.image.urlPicsumPhotos(),
        isVisible: faker.faker.datatype.boolean(),
      });
    }
  }

  findAll(){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(this.products)
      }, 5000)
    })
  }

  findById(id){
    return this.products.find(producto => producto.id == id);
  }

  createProduct(product){
    const newProduct = {
      id: faker.faker.string.uuid(),
      ...product,
      isVisible: true
    }
    this.products.push(newProduct)
    return newProduct
  }

  updateProduct(id, productSent){
    const productFound = this.products.find(producto => producto.id == id);

    if (productFound){
      this.products = this.products.map(product =>{
        if (product.id == id){
          return {
            ...product,
            ...productSent
          }
        }
        return {
          ...product
        }
      });
      return productFound
    }
    else{
      return undefined
    }
  }

  deleteProduct(id){
    const productFound = this.products.find(producto => producto.id == id);
    if (productFound){
      this.products = this.products.filter(producto => producto.id != productFound.id)
      return productFound;
    }
    else{
      return undefined
    }

  }

}

module.exports = new ProductsService();
