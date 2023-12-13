'use strict';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *user
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: hashPassword,
         *   isBetaMember: false
         * }], {});
         */

        const hashPassword = bcrypt.hashSync('123456', salt);
        // tên user là tên của database
        await queryInterface.bulkInsert(
            'User',
            [
                {
                    email: 'phamquangduc110@gmail.com',
                    password: hashPassword,
                    name: 'Quang Đức',
                    roleId: 3,
                    ngaySinh: '22',
                    thangSinh: '12',
                    namSinh: '2002',
                    gioiTinh: 0,
                    image: 'consult.png',
                    soDT: '0965420922',
                    maOTP: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: 'phamquangduc2002@gmail.com',
                    password: hashPassword,
                    name: 'Quang Đức',
                    roleId: 2,
                    ngaySinh: '22',
                    thangSinh: '12',
                    namSinh: '2002',
                    gioiTinh: 0,
                    image: 'avt-default.jpg',
                    soDT: '0965420922',
                    maOTP: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: 'Quangduc2002@gmail.com',
                    password: hashPassword,
                    name: 'Quang Đức',
                    roleId: 1,
                    ngaySinh: '22',
                    thangSinh: '12',
                    namSinh: '2002',
                    gioiTinh: 0,
                    image: 'avt-default.jpg',
                    soDT: '0965420922',
                    maOTP: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: 'anhduc2002@gmail.com',
                    password: hashPassword,
                    name: 'Quang Đức',
                    roleId: 1,
                    ngaySinh: '22',
                    thangSinh: '12',
                    namSinh: '2002',
                    gioiTinh: 0,
                    image: 'avt-default.jpg',
                    soDT: '0965420922',
                    maOTP: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: 'phamquangduc202@gmail.com',
                    password: hashPassword,
                    name: 'Quang Đức',
                    roleId: 1,
                    ngaySinh: '22',
                    thangSinh: '12',
                    namSinh: '2002',
                    gioiTinh: 0,
                    image: 'avt-default.jpg',
                    soDT: '0965420922',
                    maOTP: '',
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
