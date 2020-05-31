const ordersController = require('./orders');
const usersController = require('./users');
const statusesController = require('./statuses');
const servicesController = require('./services');

module.exports = {
  async checkToken(ctx) {
    const { user } = ctx.req;

    ctx.body = { status: 'success', user };
  },
  async getUsers(ctx) {
    const users = await usersController.getUsers();

    ctx.body = { users };
  },
  async getOrders(ctx) {
    const { options } = ctx.request.body;

    const orders = await ordersController.getOrders(options);

    ctx.body = { orders };
  },
  async getOrder(ctx) {
    try {
      const { orderId } = ctx.request.body;

      const order = await ordersController.getOrder(orderId);

      ctx.body = { status: 'success', order };
    } catch (error) {
      console.log(error);
    }
  },
  async updateOrderStatus(ctx) {
    try {
      const { orderId, statusId } = ctx.request.body;

      await ordersController.updateOrderStatus(orderId, statusId);

      const title = await statusesController.getStatusTitle(statusId);

      ctx.body = { status: 'success', title, orderId };
    } catch (error) {
      console.log(error);
    }
  },
  async updateServices(ctx) {
    try {
      const {
        service,
        typeOfServices,
        delTypeOfServices
      } = ctx.request.body.options;

      const updateService = await servicesController.updateService(service);
      const updateTypeOfServices = await servicesController.updateTypeOfServices(
        typeOfServices,
        updateService.serviceId
      );
      await servicesController.delTypeOfServices(delTypeOfServices);

      ctx.body = { status: 'success', updateService, updateTypeOfServices };
    } catch (error) {
      ctx.status = 409;
      ctx.body = { status: 'fail', error };
    }
  }
};
