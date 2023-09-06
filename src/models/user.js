'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    user.init(
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
        },
        {
            timestamps: false,
            sequelize,
            modelName: 'user',
        },
    );
    return user;
};
