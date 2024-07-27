module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    Product.associate = (models) => {
      Product.hasMany(models.Costumer, { foreignKey: 'id_product', as: 'costumers' });
    };
  
    return Product;
  };
  