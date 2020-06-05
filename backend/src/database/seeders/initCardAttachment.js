
module.exports = {
    up(queryInterface, Sequelize) {
        let date = new Date();
        let userIds = [1,1,2,2,1,2,1,3,2,3];
        let boardListCardIds = [1,2,3,4,5,3,2,5,7,2];
        let attachmentIds =    [1,2,3,4,5,6,7,8,9,10];
        let isCovers =         [1,1,1,1,1,0,0,0,1,0];

        return queryInterface.bulkInsert('CardAttachment', userIds.map((name, index) => {
            let id = index + 1;
            return {
                id,
                userId: userIds[index],
                boardListCardId: boardListCardIds[index],
                attachmentId: attachmentIds[index],
                isCover: !!isCovers[index],
                createdAt: date,
                updatedAt: date
            }
        }));
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('CardAttachment', null, {});
    }
};