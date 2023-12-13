'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('OrderItem', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            orderID: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Order',
                    key: 'ID',
                },
            },
            productID: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Product',
                    key: 'ID',
                },
            },
            soLuong: {
                type: Sequelize.INTEGER,
            },
            donGia: {
                type: Sequelize.FLOAT,
            },
            image: {
                type: Sequelize.STRING,
            },
            tenSp: {
                type: Sequelize.STRING,
            },
            giaNhap: {
                type: Sequelize.STRING,
            },
            giaBan: {
                type: Sequelize.STRING,
            },
            chatLieu: {
                type: Sequelize.STRING,
            },
            giamGia: {
                type: Sequelize.STRING,
            },
            kichThuoc: {
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
        await queryInterface.dropTable('OrderItem');
    },
};
