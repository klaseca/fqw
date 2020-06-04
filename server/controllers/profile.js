const jwt = require('jsonwebtoken');
const carsController = require('./cars');
const ordersController = require('./orders');
const usersController = require('./users');
const servicesController = require('./services');
const { OrderServices, Op } = require('./../models');

module.exports = {
  async createReport(ctx) {
    const { userId } = ctx.req.user;
    const { startDate, endDate, carId } = ctx.request.body;

    const options = {
      userId,
      carId,
      dateStart: {
        [Op.between]: [startDate, endDate]
      },
      statusId: 4
    };
    const orders = await ordersController.getOrders(options);

    if (orders.length) {
      const reportData = {
        startDate,
        endDate,
        carsCount: carId.length,
        cars: [...new Set(orders.map(({ car }) => car))],
        price: orders.reduce((total, { price }) => total + price, 0),
        ordersCount: orders.length,
        servicesCount: orders.length,
        services: [
          ...new Set(orders.map(({ orderServices }) => orderServices[0].title))
        ],
        tosCount: orders.reduce(
          (total, { orderServices }) =>
            total + orderServices[0].typeOfService.length,
          0
        ),
        tos: [
          ...new Set(
            orders.flatMap(
              ({ orderServices }) => orderServices[0].typeOfService
            )
          )
        ]
      };

      ctx.body = { reportData, message: '' };
    } else {
      ctx.body = { reportData: {}, message: 'Не найдено информации' };
    }
  },
  async checkToken(ctx) {
    const { user } = ctx.req;

    ctx.body = { status: 'success', user };
  },
  async getCabinetData(ctx) {
    const { userId } = ctx.req.user;

    const carsData = await carsController.getCars(userId);
    const orders = await ordersController.getOrdersShort(userId);

    const cars = carsData.map(car => {
      const { userId: id, ...newCar } = car;
      return newCar;
    });

    ctx.body = { cars, orders };
  },
  async createNewOrder(ctx) {
    try {
      const { userId } = ctx.req.user;
      const { orderItems, carChanged, date } = ctx.request.body;

      const dateStart = new Date(date);

      const tofs = orderItems.map(tof => tof.typeOfServices).flat();
      const price = await servicesController.getPrice({
        typeOfServiceId: tofs
      });

      const { orderId } = await ordersController.createOrder(
        userId,
        dateStart,
        carChanged,
        price
      );

      for await (const { serviceId, typeOfServices } of orderItems.values()) {
        for await (const typeOfServiceId of typeOfServices.values()) {
          await OrderServices.create({
            orderId,
            serviceId,
            typeOfServiceId
          });
        }
      }

      ctx.body = { status: 'success', orderId };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { status: 'fail', message: error };
    }
  },
  async getMyOrders(ctx) {
    const { userId } = ctx.req.user;

    const orders = await ordersController.getOrders({ userId });

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
  async updateData(ctx) {
    try {
      const { userId } = ctx.req.user;

      const data = ctx.request.body;

      const user = await usersController.updateData(userId, data);

      const payload = {
        userId: user.userId,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName
      };

      const token = jwt.sign(payload, 'zzz');

      ctx.body = { status: 'success', user: { ...payload, token } };
    } catch (error) {
      console.log(error);
    }
  },
  async updateCar(ctx) {
    const { carId, car: data } = ctx.request.body;

    const { userId, ...car } = await carsController.updateCar(carId, data);

    ctx.body = { status: 'success', car };
  },
  async deleteCar(ctx) {
    const { carId } = ctx.request.body;

    await carsController.deleteCar(carId);

    ctx.body = { status: 'success', carId };
  },
  async addCar(ctx) {
    const { userId } = ctx.req.user;
    const { car: data } = ctx.request.body;

    const car = await carsController.addCar(userId, data);

    ctx.body = { status: 'success', car };
  }
};
