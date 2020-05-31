const { Car } = require('./../models');

module.exports = {
  async getCars(userId) {
    try {
      const cars = await Car.findAll({
        where: { userId },
        raw: true
      });

      return cars;
    } catch (error) {
      console.log(error);
      return 0;
    }
  },
  async updateCar(carId, data) {
    try {
      const userRes = await Car.update(data, {
        where: { carId },
        returning: true
      });

      return userRes[1][0].dataValues;
    } catch (error) {
      return error;
    }
  },
  async deleteCar(carId) {
    try {
      await Car.destroy({ where: { carId } });
    } catch (error) {
      console.log(error);
    }
  },
  async addCar(userId, data) {
    try {
      const car = await Car.create({
        ...data,
        userId
      });

      const { userId: id, ...carData } = car.dataValues;

      return carData;
    } catch (error) {
      return error;
    }
  }
};
