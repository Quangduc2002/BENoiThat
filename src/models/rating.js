'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Rating extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Rating.belongsTo(models.Product, {
                foreignKey: 'productId',
            });
            Rating.belongsTo(models.User, {
                foreignKey: 'userId',
            });
        }
    }
    Rating.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            userId: DataTypes.INTEGER,
            productId: DataTypes.INTEGER,
            numberRating: DataTypes.INTEGER,
            orderId: DataTypes.INTEGER,
            comment: DataTypes.STRING,
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'Rating',
        },
    );
    return Rating;
};
