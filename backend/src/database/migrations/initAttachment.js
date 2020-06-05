module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Attachment', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            originName: {
                type: Sequelize.STRING(255),
                defaultValue: '',
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(255),
                defaultValue: '',
                allowNull: false
            },
            type: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            size: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
            // path: {
            //     type: Sequelize.STRING(255),
            //     allowNull: false
            // },
            // url: {
            //     type: Sequelize.STRING(255),
            //     allowNull: false
            // },
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
        return queryInterface.dropTable('Attachment');
    }
};