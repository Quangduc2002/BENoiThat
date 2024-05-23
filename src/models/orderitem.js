'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderItem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            OrderItem.belongsTo(models.Order, {
                foreignKey: 'orderId',
            });
            OrderItem.belongsTo(models.Product, {
                foreignKey: 'productId',
            });
        }
    }
    OrderItem.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            orderID: DataTypes.INTEGER,
            productID: DataTypes.INTEGER,
            soLuong: DataTypes.INTEGER,
            donGia: DataTypes.FLOAT,
            image: DataTypes.STRING,
            tenSp: DataTypes.STRING,
            giaNhap: DataTypes.STRING,
            giaBan: DataTypes.STRING,
            chatLieu: DataTypes.STRING,
            giamGia: DataTypes.STRING,
            kichThuoc: DataTypes.STRING,
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'OrderItem',
        },
    );
    return OrderItem;
};
