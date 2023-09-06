'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            product.belongsTo(models.producttype);
            product.hasMany(models.orderitem);
        }
    }
    product.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            tenSp: DataTypes.STRING,
            chatLieu: DataTypes.STRING,
            giaNhap: DataTypes.STRING,
            giaBan: DataTypes.STRING,
            giamGia: DataTypes.STRING,
            image: DataTypes.STRING,
            kichThuoc: DataTypes.STRING,
            soLuotDanhGia: DataTypes.INTEGER,
            tongDanhGia: DataTypes.FLOAT,
            producttypeId: DataTypes.STRING,
            soLuong: DataTypes.INTEGER,
            trangThai: DataTypes.INTEGER,
        },
        {
            timestamps: false,
            sequelize,
            modelName: 'product',
        },
    );
    return product;
};
