const faker = require('@faker-js/faker')
const regexPasswordRule = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

const  { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');
const { queryErrorHandler } = require('../middlewares/error.handler');

class UsersService{

  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    const amountUsers = 10;

    for (let i = 0; i < amountUsers; i++){
      const newUser = {
        id: faker.faker.string.uuid(),
        name: faker.faker.internet.userName(),
        email: faker.faker.internet.email(),
        password: faker.faker.internet.password({
          length: 17,
          memorable: true,
          pattern: regexPasswordRule,
        }),
        role: faker.faker.number.int({
          min: 0,
          max: 3,
        }),
        isActive: faker.faker.datatype.boolean(),
      }

      this.users.push(newUser);
    }
  }

  async findAll(){
    const response = models.User.findAll();
    return response
  }

  async showActiveUsers(){
    return this.users.filter(user => user.isActive !== false)
  }

  async getUserById(id){
    const foundUser = await models.User.findByPk(id);

    if(!foundUser){
      throw new boom.notFound('El usuario no existe');
    }

    return  foundUser;
  }

  async createUser(body){
    const newUser = await models.User.create(body)

    return newUser;
  }

  async updateUser(id, body){
    // const userFound = this.users.find(usuario => usuario.id == id);

    // if (userFound){
    //   this.users = this.users.map(usuario => {
    //     if (usuario.id == id){
    //       return {
    //         ...usuario,
    //         ...body
    //       };
    //     }
    //     return usuario;
    //   })
    // }

    const foundUser = await this.getUserById(id);

    const updatedUser = await foundUser.update(body)

    return updatedUser;
  }

  async deleteUser(id){
    // const userFound = this.users.find(usuario => usuario.id == id);

    // if (userFound){
    //   this.users = this.users.map(usuario => {
    //     if (usuario.id == id){
    //       return {
    //         ...usuario,
    //         isActive: false
    //       };
    //     }
    //     return usuario;
    //   })
    // }

    const foundUser = await this.getUserById(id);

    foundUser.destroy()

    return foundUser;
  }

}

module.exports = new UsersService();
