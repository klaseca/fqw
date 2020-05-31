module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dateStart: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dateEnd: {
      type: DataTypes.DATEONLY
    },
    price: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    }
  });

  Order.associate = models => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Order.belongsTo(models.Car, {
      foreignKey: 'carId',
      as: 'car'
    });

    Order.belongsTo(models.Status, {
      foreignKey: 'statusId',
      as: 'status'
    });

    Order.hasMany(models.OrderServices, {
      foreignKey: 'orderId',
      as: 'orderServices',
      onDelete: 'CASCADE'
    });
  };

  return Order;
};
