const express = require('express');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
	getOrderSchema,
	createOrderSchema,
  addItemSchema
} = require('../schema/order.schema');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new OrderService();

router.get(
	'/order/:id',
	validatorHandler(getOrderSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const order = await service.findOne(id);
			res.json(order);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
  passport.authenticate('jwt', {session:false}),
  // checkRoles('admin', 'seller', 'customer'),
	// validatorHandler(createOrderSchema, 'body'),
	async (req, res, next) => {
		try {
      console.log(req.user)
			const userId = req.user.sub;
      const newOrder = await service.create(userId)
			res.status(201).json({ newOrder });
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/add-item',
	validatorHandler(addItemSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newItem = await service.addItem(body);
			res.status(201).json({ newItem });
		} catch (error) {
			next(error);
		}
	}
);

router.get('/user',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'seller', 'customer'),
  async (req, res, next) =>{
    try{
      const ordersByUser = await service.findOrdersByUser(req.user.sub);

      res.json(ordersByUser)
    }
    catch(e){
      next(e)
    }
  }
);

module.exports = router;
