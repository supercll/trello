
module.exports = {
    up(queryInterface, Sequelize) {
        let date = new Date();
        let userIds =      [1,1,1,1,2,1,2,2,2,1];
        let boardListIds = [1,2,2,3,4,2,5,5,7,10];

        return queryInterface.bulkInsert('BoardListCard', boardListIds.map((name, index) => {
            let id = index + 1;
            return {
                id,
                userId: userIds[index],
                boardListId: boardListIds[index],
                name: 'board-list-card-' + id,
                description: 'board-list-card-content-' + id,
                order: 65536 * id,
                createdAt: date,
                updatedAt: date
            }
        }));
    },
    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('BoardListCard', null, {});
    }
};