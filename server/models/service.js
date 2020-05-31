module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    serviceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Service.associate = models => {
    Service.hasMany(models.TypeOfService, {
      foreignKey: 'serviceId',
      as: 'typeOfServices',
      onDelete: 'CASCADE'
    });

    Service.hasMany(models.OrderServices, {
      foreignKey: 'serviceId',
      as: 'orderServices',
      onDelete: 'CASCADE'
    });
  };

  return Service;
};
