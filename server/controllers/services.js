const { Service, TypeOfService } = require('./../models');

module.exports = {
  async getServices(ctx) {
    try {
      const servicesRes = await Service.findAll({
        order: [['serviceId', 'DESC']],
        include: [
          {
            model: TypeOfService,
            as: 'typeOfServices'
          }
        ]
      });

      const services = servicesRes.map(service => service.dataValues);

      ctx.body = { services };
    } catch (error) {
      ctx.body = { status: 'fail', message: error };
    }
  },
  async updateService({ serviceId, ...data }) {
    try {
      if (Number.isNaN(+serviceId)) {
        const service = await Service.create(data);
        return service;
      }

      const service = await Service.update(data, {
        where: { serviceId },
        returning: true
      });

      return service[1][0].dataValues;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async updateTypeOfServices(tofs, serviceId) {
    const updateTofs = tofs.filter(tof => !Number.isNaN(+tof.typeOfServiceId));
    const createTofs = tofs.filter(tof => Number.isNaN(+tof.typeOfServiceId));

    const newUpTofs = await Promise.all(
      updateTofs.map(async tof => {
        const upTof = await TypeOfService.update(
          {
            title: tof.title,
            description: tof.description,
            price: tof.price
          },
          {
            where: { typeOfServiceId: tof.typeOfServiceId },
            returning: true
          }
        );

        return upTof[1][0].dataValues;
      })
    );

    const newCrTofs = await Promise.all(
      createTofs.map(async tof => {
        const crTof = await TypeOfService.create({
          title: tof.title,
          description: tof.description,
          price: tof.price,
          serviceId
        });

        return crTof;
      })
    );

    return [...newUpTofs, ...newCrTofs];
  },
  async getPrice(options) {
    try {
      const tos = await TypeOfService.findAll({
        where: options,
        attributes: ['price'],
        raw: true
      });
      const prices = tos.reduce((total, { price }) => total + price, 0);
      return prices;
    } catch (error) {
      return error;
    }
  },
  async delTypeOfServices(delTypeOfServices) {
    await TypeOfService.destroy({
      where: { typeOfServiceId: delTypeOfServices }
    });
  }
};
