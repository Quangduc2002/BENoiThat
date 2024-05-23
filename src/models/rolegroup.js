'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RoleGroup extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    RoleGroup.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            groupId: DataTypes.INTEGER,
            roleId: DataTypes.INTEGER,
        },
        {
            timestamps: false,
            sequelize,
            modelName: 'RoleGroup',
        },
    );
    return RoleGroup;
};
