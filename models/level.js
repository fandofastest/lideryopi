module.exports = (sequelize, DataTypes) => {
    const Level = sequelize.define('Level', {
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      levelname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Level.associate = (models) => {
      Level.hasMany(models.User, { foreignKey: 'id_level', as: 'users' });
    };
  
    return Level;
  };
  