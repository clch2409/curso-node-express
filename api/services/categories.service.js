const faker = require('@faker-js/faker');

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

  findAll(){
    return this.categories;
  }

  createCategory(body){
    const id = faker.faker.string.uuid();
    const newCategory = {
      id,
      ...body,
      isActive: true
    }
    this.categories.push(newCategory);

    return newCategory;
  }

  findCategoryById(id){
    const foundCategory = this.categories.find(category => category.id == id);

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
