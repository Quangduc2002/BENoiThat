'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ImportReceiptDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ImportReceiptDetail.belongsTo(models.Product, {
                foreignKey: 'productId',
            });
            ImportReceiptDetail.belongsTo(models.ImportReceipt, {
                foreignKey: 'receiptId',
            });
        }
    }
    ImportReceiptDetail.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            productId: DataTypes.INTEGER,
            receiptId: DataTypes.INTEGER,
            soLuong: DataTypes.INTEGER,
            giaNhap: DataTypes.STRING,
        },
        {
            timestamps: false,
            sequelize,
            modelName: 'ImportReceiptDetail',
        },
    );
    return ImportReceiptDetail;
};
