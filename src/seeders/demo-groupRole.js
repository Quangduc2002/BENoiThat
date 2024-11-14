'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *user
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   tenChatLieu: hashPassword,
         *   isBetaMember: false
         * }], {});
         */

        // tên user là tên của database
        await queryInterface.bulkInsert(
            'GroupRole',
            [
                {
                    name: 'Khách hàng',
                    name: 'USER',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Ban Quản lý',
                    name: 'MANAGEMENT_BOARD',
                    updatedAt: new Date(),
                },
                {
                    name: 'Quản trị viên',
                    name: 'ADMIN',
                    createdAt: new Date(),
                    updatedAt: new Date(),
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
