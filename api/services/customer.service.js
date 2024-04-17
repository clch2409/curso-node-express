
const {models} = require('../libs/sequelize')

class CustomerService {

  async findAll(){
    return (await models.Customer.findAll())
  }



}

module.exports = new CustomerService();
