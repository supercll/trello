module.exports = {
    up(queryInterface, Sequelize) {
        let date = new Date();
        let userIds = [1, 1, 1, 1, 2, 1, 1, 2, 2, 1];
        let types = [
            "image/jpeg",
            "image/jpeg",
            "image/jpeg",
            "image/jpeg",
            "image/jpeg",
            "image/jpeg",
            "image/jpeg",
            "image/jpeg",
            "image/jpeg",
            "image/jpeg",
        ];

        return queryInterface.bulkInsert(
            "Attachment",
            userIds.map((name, index) => {
                let id = index + 1;
                return {
                    id,
                    userId: userIds[index],
                    originName: "cat-" + id,
                    name: `cat-${id}.jpg`,
                    type: types[index],
                    size: 10000,
                    // path: '',
                    // url: '',
                    createdAt: date,
                    updatedAt: date,
                };
            })
        );
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Attachment", null, {});
    },
};
