'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('RoleGroup', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            groupId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'GroupRole',
                    key: 'ID',
                },
            },
            roleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Role',
                    key: 'ID',
                },
            },

            createdAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('RoleGroup');
    },
};
