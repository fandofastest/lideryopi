module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Levels', [
      {
        level: 1,
        levelname: 'marketing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: 2,
        levelname: 'submarketing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: 3,
        levelname: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Levels', null, {});
  }
};
