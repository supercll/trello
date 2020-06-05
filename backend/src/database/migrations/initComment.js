module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Comment', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            boardListCardId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            content: {
                type: Sequelize.STRING(2000),
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
        }, {
            charset: 'utf8mb4'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Comment');
    }
};