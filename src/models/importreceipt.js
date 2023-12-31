'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ImportReceipt extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ImportReceipt.hasMany(models.ImportReceiptDetail, {
                foreignKey: 'receiptId',
            });
        }
    }
    ImportReceipt.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            maNV: DataTypes.INTEGER,
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'ImportReceipt',
        },
    );
    return ImportReceipt;
};
