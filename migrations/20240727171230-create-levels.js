module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Levels', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      levelname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Levels');
  }
};
