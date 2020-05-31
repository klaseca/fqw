module.exports = (sequelize, DataTypes) => {
  const OrderServices = sequelize.define('OrderServices', {
    orderServicesId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Orders',
        key: 'orderId'
      }
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Services',
        key: 'serviceId'
      }
    },
    typeOfServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'TypeOfServices',
        key: 'typeOfServiceId'
      }
    }
  });

  OrderServices.associate = models => {
    OrderServices.belongsTo(models.Service, {
      foreignKey: 'serviceId',
      as: 'service'
    });

    OrderServices.belongsTo(models.Order, {
      foreignKey: 'orderId'
    });

    OrderServices.belongsTo(models.TypeOfService, {
      foreignKey: 'typeOfServiceId',
      as: 'typeOfService'
    });
  };

  return OrderServices;
};
