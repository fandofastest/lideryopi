module.exports = (sequelize, DataTypes) => {
    const Costumer = sequelize.define('Costumer', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_upline: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    });
  
    Costumer.associate = (models) => {
      Costumer.belongsTo(models.Product, { foreignKey: 'id_product', as: 'product' });
      Costumer.belongsTo(models.User, { foreignKey: 'id_upline', as: 'upline' });
    };
  
    return Costumer;
  };
  