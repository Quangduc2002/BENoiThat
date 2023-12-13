'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ImportReceipt', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            maNV: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'User',
                    key: 'ID',
                },
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ImportReceipt');
    },
};
