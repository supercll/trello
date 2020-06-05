module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('BoardListCard', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            boardListId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(2000),
                allowNull: false,
                defaultValue: ''
            },
            order: {
                type: Sequelize.FLOAT,
                allowNull: false,
                defaultValue: 0
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
        return queryInterface.dropTable('BoardListCard');
    }
};