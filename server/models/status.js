module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    statusId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Status.associate = models => {
    Status.hasMany(models.Order, {
      foreignKey: 'statusId',
      onDelete: 'CASCADE'
    });
  };

  return Status;
};
