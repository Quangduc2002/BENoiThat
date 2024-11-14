'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GroupRole extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            GroupRole.hasMany(models.User, {
                foreignKey: 'roleId',
            });

            GroupRole.belongsToMany(models.Role, {
                through: 'RoleGroup',
                foreignKey: 'groupId',
            });
        }
    }
    GroupRole.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            role: DataTypes.STRING,
        },
        {
            timestamps: false,
            sequelize,
            modelName: 'GroupRole',
        },
    );
    return GroupRole;
};
