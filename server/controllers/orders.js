const {
  Order,
  OrderServices,
  Service,
  TypeOfService,
  Status,
  Car
} = require('./../models');

module.exports = {
  async getOrdersShort(userId) {
    try {
      const ordersRes = await Order.findAll({
        where: { userId },
        limit: 4,
        order: [['orderId', 'DESC']],
        attributes: ['orderId', 'dateStart'],
        include: [
          {
            model: OrderServices,
            as: 'orderServices'
          },
          {
            model: Status,
            as: 'status'
          },
          {
            model: Car,
            as: 'car'
          }
        ]
      });

      const ordersJson = JSON.stringify(ordersRes, null, 2);
      const ordersValue = JSON.parse(ordersJson);

      const orders = ordersValue.map(order => {
        const { orderServices, dateStart, status, car, ...otherOrder } = order;
        const formattedDate = dateStart
          .split('-')
          .reverse()
          .join('.');

        return {
          ...otherOrder,
          dateStart: formattedDate,
          status: status.title,
          stateNumber: car.stateNumber,
          countServices: orderServices.length
        };
      });

      return orders;
    } catch (error) {
      return error;
    }
  },
  async getOrder(orderId) {
    try {
      const orderRes = await Order.findOne({
        where: { orderId },
        include: [
          {
            model: OrderServices,
            as: 'orderServices',
            include: [
              {
                model: Service,
                as: 'service'
              },
              {
                model: TypeOfService,
                as: 'typeOfService'
              }
            ]
          },
          {
            model: Status,
            as: 'status'
          },
          {
            model: Car,
            as: 'car'
          }
        ]
      });

      const orderJson = JSON.stringify(orderRes, null, 2);
      const order = JSON.parse(orderJson);

      const groupBy = (items, key) =>
        items.reduce(
          (result, item) => ({
            ...result,
            [item[key]]: [...(result[item[key]] || []), item]
          }),
          {}
        );

      const group = groupBy(order.orderServices, 'serviceId');
      const service = Object.values(group).map(a => ({
        title: a[0].service.title,
        typeOfService: a.map(({ typeOfService }) => typeOfService.title)
      }));

      const { brand, model, stateNumber } = order.car;
      const car = `${brand} ${model} ${stateNumber}`;

      const dateStart = order.dateStart
        .split('-')
        .reverse()
        .join('.');

      return {
        ...order,
        dateStart,
        status: order.status.title,
        car,
        orderServices: service
      };
    } catch (error) {
      return error;
    }
  },
  async createOrder(userId, dateStart, carId, price) {
    try {
      const order = await Order.create({
        userId,
        dateStart,
        carId,
        price,
        statusId: 1
      });

      return order;
    } catch (error) {
      return error;
    }
  },
  async getOrders(options) {
    try {
      const ordersRes = await Order.findAll({
        where: options,
        order: [['orderId', 'DESC']],
        include: [
          {
            model: OrderServices,
            as: 'orderServices',
            include: [
              {
                model: Service,
                as: 'service'
              },
              {
                model: TypeOfService,
                as: 'typeOfService'
              }
            ]
          },
          {
            model: Status,
            as: 'status'
          },
          {
            model: Car,
            as: 'car'
          }
        ]
      });

      const ordersJson = JSON.stringify(ordersRes, null, 2);
      const ordersValue = JSON.parse(ordersJson);

      const groupBy = (items, key) =>
        items.reduce(
          (result, item) => ({
            ...result,
            [item[key]]: [...(result[item[key]] || []), item]
          }),
          {}
        );

      const orders = ordersValue.map(order => {
        const group = groupBy(order.orderServices, 'serviceId');
        const service = Object.values(group).map(a => ({
          title: a[0].service.title,
          typeOfService: a.map(({ typeOfService }) => typeOfService.title)
        }));

        const { brand, model, stateNumber } = order.car;
        const car = `${brand} ${model} ${stateNumber}`;

        const dateStart = order.dateStart
          .split('-')
          .reverse()
          .join('.');

        return {
          ...order,
          dateStart,
          status: order.status.title,
          car,
          orderServices: service
        };
      });

      return orders;
    } catch (error) {
      return error;
    }
  },
  async updateOrderStatus(orderId, statusId) {
    await Order.update(
      { statusId },
      {
        where: { orderId }
      }
    );
  }
};
