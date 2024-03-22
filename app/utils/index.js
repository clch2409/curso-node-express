const faker = require('@faker-js/faker')

function createUsers(amountUsers){
  const users = []

  for (let i = 0; i < amountUsers; i++){
    users.push({
      id: i+1,
      name: faker.fakerES.person.firstName(),
      lastName: faker.fakerES.person.lastName(),
      email: faker.fakerES.internet.email(),
    });
  }

  return users;
}

function createProducts(amountProducts){
  const products = []

  for (let i = 0; i < amountProducts; i++){
    products.push({
      id: i+1,
      name: faker.fakerES.commerce.product(),
      price: parseFloat(faker.fakerES.commerce.price({min: 10, max: 1000})),
      stock: faker.simpleFaker.number.int({min: 1,  max: 50}),
      image: faker.fakerES.image.urlPicsumPhotos(),
    });
  }

  return products;
}

module.exports = {createUsers, createProducts};
