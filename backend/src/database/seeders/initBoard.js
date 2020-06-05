const crypto = require('crypto');

module.exports = {
    up(queryInterface, Sequelize) {
        let date = new Date();
        let userIds = [1,1,2,2,1,2,1,3,2,3];

        return queryInterface.bulkInsert('Board', userIds.map((name, index) => {
            let id = index + 1;
            return {
                id,
                userId: userIds[index],
                name: 'board-' + id,
                createdAt: date,
                updatedAt: date
            }
        }));
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Board', null, {});
    }
};