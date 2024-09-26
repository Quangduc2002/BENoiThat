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
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F6b67d493-acd1-4711-a72a-9a7231e6df1f?alt=media&token=55e2308c-4e43-4f76-882e-1f689e7b5da2',
                    soDT: '0965420922',
                    maOTP: '',
                    status: true,
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
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F24f868a3-7e99-481e-b7ca-f905d57a669b?alt=media&token=a7591db7-7581-49ab-995a-a2492022d1fc',
                    soDT: '0965420922',
                    maOTP: '',
                    status: true,
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
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F24f868a3-7e99-481e-b7ca-f905d57a669b?alt=media&token=a7591db7-7581-49ab-995a-a2492022d1fc',
                    soDT: '0965420922',
                    maOTP: '',
                    status: true,
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
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F24f868a3-7e99-481e-b7ca-f905d57a669b?alt=media&token=a7591db7-7581-49ab-995a-a2492022d1fc',
                    soDT: '0965420922',
                    maOTP: '',
                    status: true,
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
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F24f868a3-7e99-481e-b7ca-f905d57a669b?alt=media&token=a7591db7-7581-49ab-995a-a2492022d1fc',
                    soDT: '0965420922',
                    maOTP: '',
                    status: true,
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
