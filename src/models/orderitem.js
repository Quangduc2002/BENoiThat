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
        }
    }
    orderitem.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            // maSp: DataTypes.INTEGER,
            orderID: DataTypes.INTEGER,
            idSanPham: DataTypes.INTEGER,
            soLuong: DataTypes.INTEGER,
            donGia: DataTypes.FLOAT,
            image: DataTypes.STRING,
            tenSp: DataTypes.STRING,
        },
        {
            timestamps: false,
            sequelize,
            modelName: 'orderitem',
        },
    );
    return orderitem;
};
