'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Order', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            tenKH: {
                type: Sequelize.STRING,
            },
            diaChi: {
                type: Sequelize.STRING,
            },
            soDT: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            phuongThucTT: {
                type: Sequelize.STRING,
            },
            trangThaiDH: {
                type: Sequelize.INTEGER,
            },
            maKH: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'User',
                    key: 'ID',
                },
            },
            isPay: {
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('Order');
    },
};
