const faker = require('@faker-js/faker')
const regexPasswordRule = RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)

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
          pattern: regexPasswordRule,
        }),
        role: faker.faker.number.int({
          min: 0,
          max: 3,
        })
      }

      this.users.push(newUser);
    }
  }

  findAll(){
    return this.users;
  }

  getUserById(id){
    return this.users.find(usuario => usuario.id == id)
  }

  createUser(body){
    const newId = faker.faker.string.uuid();
    const newUser = {
      id: newId,
      ...body,
      isActive: true
    }
    this.users.push(newUser);

    return newUser;
  }

  updateUser(id, body){
    const userFound = this.users.find(usuario => usuario.id == id);

    if (userFound){
      this.users = this.users.map(usuario => {
        if (usuario.id == id){
          return {
            ...usuario,
            ...body
          };
        }
        return usuario;
      })
    }

    return userFound;
  }

  deleteUser(id){
    const userFound = this.users.find(usuario => usuario.id == id);

    if (userFound){
      this.users = this.users.map(usuario => {
        if (usuario.id == id){
          return {
            ...usuario,
            isActive: false
          };
        }
        return usuario;
      })
    }

    return userFound;
  }

}

module.exports = new UsersService();
