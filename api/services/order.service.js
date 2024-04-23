const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const customerService = require('./customer.service');

class OrderService {
	constructor() {
	}

	async create(userId) {
		const customer = await customerService.findCustomerByUser(userId);

    if (!customer){
      throw boom.unauthorized();
    }

    const order = await models.Order.create({
      customerId: customer.dataValues.id
    });

    return order;

	}

  async addItem(data) {
		const newItem = await models.ProductOrder.create(data);
		return newItem;
	}

	async find() {
		return [];
	}

	async findOne(id) {
		const order = await models.Order.findByPk(id, {
			include: [
				{
					association: 'customer',
					include: ['user'],
				},
        {
          association: 'items',
          include: ['category']
        },

			],
		});
		return order;
	}

  async findOrdersByUser(userId){
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ],
    });

    return orders;
  }

	async update(id, changes) {
		return {
			id,
			changes,
		};
	}

	async delete(id) {
		return { id };
	}
}

module.exports = OrderService;
