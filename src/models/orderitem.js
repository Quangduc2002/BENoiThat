'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class orderitem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            orderitem.belongsTo(models.order);
            orderitem.belongsTo(models.product);
        }
    }
    orderitem.init(
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
            timestamps: false,
            sequelize,
            modelName: 'orderitem',
        },
    );
    return orderitem;
};
