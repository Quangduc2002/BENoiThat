'use strict';
const { TRUE } = require('node-sass');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Rating, {
                foreignKey: 'userId',
            });
            User.hasMany(models.Order, {
                foreignKey: 'maKH',
            });
            User.belongsTo(models.GroupRole, {
                foreignKey: 'roleId',
            });
        }
    }
    User.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            name: DataTypes.STRING,
            roleId: DataTypes.INTEGER,
            ngaySinh: DataTypes.STRING,
            thangSinh: DataTypes.STRING,
            namSinh: DataTypes.STRING,
            image: DataTypes.STRING,
            gioiTinh: DataTypes.INTEGER,
            soDT: DataTypes.STRING,
            maOTP: DataTypes.STRING,
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'User',
        },
    );
    return User;
};
