'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Meterial extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Meterial.hasMany(models.Product, {
                foreignKey: 'chatLieu',
            });
        }
    }
    Meterial.init(
        {
            tenChatLieu: DataTypes.STRING,
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'Meterial',
        },
    );
    return Meterial;
};
