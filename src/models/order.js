'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.hasMany(models.OrderItem, {
                foreignKey: 'orderId',
            });
            Order.belongsTo(models.User, {
                foreignKey: 'maKH',
            });
        }
    }
    Order.init(
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
            maKH: DataTypes.INTEGER,
            isPay: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'Order',
        },
    );
    return Order;
};
