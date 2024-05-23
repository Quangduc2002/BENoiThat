'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *user
         * Example:
         * await queryInterface.bulkInsert('People', [{
         * tenChatLieu: hashPassword,
         * createdAt: new Date(),
                    updatedAt: new Date(),  
         *   isBetaMember: false
         * }], {});
         */

        // tên user là tên của database
        await queryInterface.bulkInsert(
            'Role',
            [
                {
                    url: '/admin/Customer',
                    description: 'Quản lý người dùng',
                },
                {
                    url: '/admin/AddCustomers',
                    description: 'Thêm người dùng',
                },
                {
                    url: '/admin/ThemSp',
                    description: 'Thêm sản phẩm',
                },
                {
                    url: '/admin/DSSP',
                    description: 'Quản lý sản phẩm',
                },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
