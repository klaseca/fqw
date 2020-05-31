module.exports = (sequelize, DataTypes) => {
  const TypeOfService = sequelize.define('TypeOfService', {
    typeOfServiceId: {
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
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  TypeOfService.associate = models => {
    TypeOfService.belongsTo(models.Service, {
      foreignKey: 'serviceId'
    });

    TypeOfService.hasMany(models.OrderServices, {
      foreignKey: 'typeOfServiceId',
      as: 'orderServices',
      onDelete: 'CASCADE'
    });
  };

  return TypeOfService;
};
