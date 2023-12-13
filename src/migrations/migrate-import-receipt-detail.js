'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ImportReceiptDetail', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            productId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Product',
                    key: 'ID',
                },
            },
            receiptId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'ImportReceipt',
                    key: 'ID',
                },
            },
            soLuong: {
                type: Sequelize.INTEGER,
            },
            giaNhap: {
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
        await queryInterface.dropTable('ImportReceiptDetail');
    },
};
