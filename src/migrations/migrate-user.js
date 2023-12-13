'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('User', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },

            roleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'GroupRole',
                    key: 'ID',
                },
            },
            ngaySinh: {
                type: Sequelize.STRING,
            },
            thangSinh: {
                type: Sequelize.STRING,
            },
            namSinh: {
                type: Sequelize.STRING,
            },
            gioiTinh: {
                type: Sequelize.INTEGER,
            },
            image: {
                type: Sequelize.STRING,
            },
            soDT: {
                type: Sequelize.STRING,
            },
            maOTP: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('User');
    },
};
