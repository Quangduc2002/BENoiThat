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
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Nhân viên',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Quản trị viên',
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
