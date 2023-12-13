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
            'Meterial',
            [
                {
                    tenChatLieu: 'Gỗ gụ',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenChatLieu: 'Gỗ hương đá',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenChatLieu: 'Vải',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenChatLieu: 'Gỗ ép',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenChatLieu: 'Gỗ hương',
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
