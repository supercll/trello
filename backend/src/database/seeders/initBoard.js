const crypto = require('crypto');

module.exports = {
  up(queryInterface, Sequelize) {
    let date = new Date();
    let userIds = [1, 1, 2, 2, 1, 2, 1, 3, 2, 3];
    let userNames = [
      'supercll',
      'supercll',
      'lc',
      'lc',
      'supercll',
      'lc',
      'supercll',
      'test',
      'lc',
      'test'
    ];
    let privates = [false, true, true, false, false, true, false, false, false, false];

    return queryInterface.bulkInsert(
      'Board',
      userIds.map((name, index) => {
        let id = index + 1;
        return {
          id,
          userId: userIds[index],
          userName: userNames[index],
          name: 'board-' + id,
          createdAt: date,
          updatedAt: date,
          private: privates[index]
        };
      })
    );
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Board', null, {});
  }
};
