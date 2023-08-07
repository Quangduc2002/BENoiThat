'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            order.hasMany(models.orderitem);
        }
    }
    order.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            tenKH: DataTypes.STRING,
            diaChi: DataTypes.STRING,
            soDT: DataTypes.STRING,
            email: DataTypes.STRING,
            phuongThucTT: DataTypes.STRING,
            trangThaiDH: DataTypes.STRING,
        },
        {
            timestamps: false,
            sequelize,
            modelName: 'order',
        },
    );
    return order;
};
