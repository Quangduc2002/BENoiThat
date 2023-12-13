'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Product.belongsTo(models.ProductType, {
                foreignKey: 'producttypeId',
            });
            Product.belongsTo(models.Meterial, {
                foreignKey: 'chatLieu',
            });
            Product.hasOne(models.ImportReceiptDetail, {
                foreignKey: 'productId',
            });
            Product.hasMany(models.OrderItem, {
                foreignKey: 'productId',
            });
            Product.hasMany(models.Rating, {
                foreignKey: 'productId',
            });
        }
    }
    Product.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            tenSp: DataTypes.STRING,
            chatLieu: DataTypes.INTEGER,
            giaNhap: DataTypes.STRING,
            giaBan: DataTypes.STRING,
            giamGia: DataTypes.STRING,
            image: DataTypes.STRING,
            kichThuoc: DataTypes.STRING,
            soLuotDanhGia: DataTypes.INTEGER,
            tongDanhGia: DataTypes.FLOAT,
            producttypeId: DataTypes.INTEGER,
            soLuong: DataTypes.INTEGER,
            trangThai: DataTypes.INTEGER,
        },
        {
            timestamps: false,
            sequelize,
            modelName: 'Product',
        },
    );
    return Product;
};
