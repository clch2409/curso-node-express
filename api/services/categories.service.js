const faker = require('@faker-js/faker');

const {models} = require('../libs/sequelize');

class CategoryService{

  constructor(){
    this.categories = [],
    this.generate();
  }

  generate(){

    const amountCategories = 5;

    for (let i = 0; i < amountCategories; i++){
      const newCategory = {
        id: faker.faker.string.uuid(),
        name: faker.faker.commerce.department(),
        isActive: faker.faker.datatype.boolean(),
      }

      this.categories.push(newCategory);
    }

  }

  async findAll(){
    const categories = await models.Category.findAll();
    return categories;
  }

  async createCategory(body){
    const newCategoryBody = {
      ...body,
      isActive: true
    }
    const newCategory = await models.Category.create(newCategoryBody);

    return newCategory;
  }

  async findCategoryById(id){
    const foundCategory = models.Category.findByPk(id, {
      include: ['products']
    });

    return foundCategory;

  }

  updateCategory(id, body){
    const foundCategory = this.categories.find(category => category.id == id);

    if (foundCategory){
      this.categories = this.categories.map(category =>{
        if (category.id == id){
          return {
            id: category.id,
            ...category,
            ...body,
          }
        }
        return category
      })

    }

    return foundCategory;
  }

  deleteCategory(id){
    const foundCategory = this.categories.find(category => category.id == id);

    if (foundCategory){
      this.categories = this.categories.map(category =>{
        if (category.id == id){
          return {
            ...category,
            isActive: false
          }
        }
        return category
      })
    }

    return foundCategory
  }

}

module.exports = new CategoryService();
