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
            'ProductType',
            [
                {
                    tenLoaiSp: 'Phòng khách',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenLoaiSp: 'Phòng bếp',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenLoaiSp: 'Phòng làm việc',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenLoaiSp: 'Phòng ngủ',
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
