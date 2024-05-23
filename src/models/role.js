'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Role.belongsToMany(models.GroupRole, {
                through: 'RoleGroup',
                foreignKey: 'roleId',
            });
        }
    }
    Role.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            url: DataTypes.STRING,
            description: DataTypes.STRING,
        },
        {
            timestamps: false,
            sequelize,
            modelName: 'Role',
        },
    );
    return Role;
};
