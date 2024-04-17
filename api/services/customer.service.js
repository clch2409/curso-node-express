
const {models} = require('../libs/sequelize')

class CustomerService {

  async findAll(){
    const customers = await models.Customer.findAll({
      include: 'user'
    });
    return customers;
  }

  async createCustomer(body, next){

    try{
      const newCustomer = models.Customer.create(body, {
        include: ['user']
      });
      return newCustomer;
    }
    catch(e){
      next(e)
    }

  }

}

module.exports = new CustomerService();
