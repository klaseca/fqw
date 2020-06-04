const { Sequelize, Op } = require('sequelize');

const sequelize = new Sequelize('gqw', 'postgres', 'klaseca2121', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

const models = {
  User: sequelize.import('./user.js'),
  Car: sequelize.import('./car.js'),
  Order: sequelize.import('./order.js'),
  Service: sequelize.import('./service.js'),
  TypeOfService: sequelize.import('./typeOfService.js'),
  OrderServices: sequelize.import('./orderServices.js'),
  Status: sequelize.import('./status.js'),
  Admin: sequelize.import('./admin.js')
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize,
  Op
};

module.exports = db;
