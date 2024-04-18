const faker = require('@faker-js/faker');
const { Op } = require('sequelize');
const {models} = require('../libs/sequelize');



class ProductsService{

  _productServiceInstance = null;

  constructor(){
    this.products = [];
    this.generate();
    // this.pool = pool;
    // pool.on('error', (err) => {
    //   console.log(err)
    // })
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

  async findAll(query){
    const options = {
      include: ['category'],
      limit: 2,
      offset: 0,
      where: {}
    }

    if (query.limit && query.offset){
      options.offset = parseInt(query.offset)
      options.limit = parseInt(query.limit);
    }

    if (query.price_min && query.price_max){
      options.where.price = {
        [Op.between]: [query.price_min, query.price_max]
      }
    }

    const products = models.Product.findAll(options);
    return products;
  }

  async findById(id){
    return this.products.find(producto => producto.id == id);
  }

  async createProduct(body){
    const newProductBody = {
      ...body,
      isVisible: true,
    }
    const newProduct = models.Product.create(newProductBody);
    return newProduct
  }

  async updateProduct(id, productSent){
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

  async deleteProduct(id){
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
