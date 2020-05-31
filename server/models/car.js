module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    carId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stateNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    yearOfIssue: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Car.associate = models => {
    Car.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Car.hasMany(models.Order, {
      foreignKey: 'carId',
      onDelete: 'CASCADE'
    });
  };

  return Car;
};
