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
        id: i+1,
        name: faker.fakerES.commerce.product(),
        price: parseFloat(faker.fakerES.commerce.price({min: 10, max: 1000})),
        stock: faker.simpleFaker.number.int({min: 1,  max: 50}),
        image: faker.fakerES.image.urlPicsumPhotos(),
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
    const newIndex = this.products.length;
    const newProduct = {
      id: newIndex + 1,
      ...product
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
