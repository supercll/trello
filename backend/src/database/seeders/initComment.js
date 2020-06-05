
module.exports = {
    up(queryInterface, Sequelize) {
        let date = new Date();
        let userIds = [1,1,2,2,1,2,1,3,2,3];
        let boardListCardIds = [1,1,1,2,1,2,3,6,6,6];

        return queryInterface.bulkInsert('Comment', userIds.map((name, index) => {
            let id = index + 1;
            return {
                id,
                userId: userIds[index],
                boardListCardId: boardListCardIds[index],
                content: 'comment-content-' + id,
                createdAt: date,
                updatedAt: date
            }
        }));
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Comment', null, {});
    }
};