
const {models} = require('../libs/sequelize')

class CustomerService {

  async findAll(){
    const customers = await models.Customer.findAll({
      include: 'user'
    });
    return customers;
  }

  async findCustomerByUser(userId){
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': userId
      },
      include: ['user']
    })

    return customer
  }

  async createCustomer(body, next){

    try{
      const newCustomer = await models.Customer.create(body, {
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
