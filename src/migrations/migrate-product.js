'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Product', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            tenSp: {
                type: Sequelize.STRING,
            },
            chatLieu: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Meterial',
                    key: 'ID',
                },
            },
            giaNhap: {
                type: Sequelize.STRING,
            },
            giaBan: {
                type: Sequelize.STRING,
            },
            giamGia: {
                type: Sequelize.STRING,
            },
            kichThuoc: {
                type: Sequelize.STRING,
            },
            soLuotDanhGia: {
                type: Sequelize.INTEGER,
            },
            tongDanhGia: {
                type: Sequelize.FLOAT,
            },
            image: {
                type: Sequelize.STRING,
            },
            producttypeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'ProductType',
                    key: 'ID',
                },
            },
            soLuong: {
                type: Sequelize.INTEGER,
            },
            trangThai: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('Product');
    },
};
