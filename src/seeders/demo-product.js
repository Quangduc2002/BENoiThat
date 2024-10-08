'use strict';

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

        // tên user là tên của database
        await queryInterface.bulkInsert(
            'product',
            [
                {
                    tenSp: 'Kệ ti vi',
                    chatLieu: 1,
                    giaNhap: '9000000',
                    giaBan: '15000000',
                    giamGia: '20',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F888c9a03-2fce-4351-9f0f-b63a0eaaeeeb?alt=media&token=914753fe-ebde-42f2-ada1-26932277c4ea',
                    kichThuoc: 'D180-R60',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 1,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Ghế ba thành',
                    chatLieu: 2,
                    giaNhap: '20000000',
                    giaBan: '27000000',
                    giamGia: '0',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2Fce424053-4b3a-4ab5-81b2-b955ae8e8d87?alt=media&token=f144ae38-7de5-4a86-8580-a0dbd23d0a76',
                    kichThuoc: 'D200-R80',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 1,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Sofa da mã NTX1824',
                    chatLieu: 3,
                    giaNhap: '15000000',
                    giaBan: '26250000',
                    giamGia: '17',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2Fbbfe8052-0ab6-42cf-a9b9-68303fa72366?alt=media&token=52d7d096-ab1f-427b-b913-c0391665395f',
                    kichThuoc: 'D200-R100',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 1,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Sofa Da MLEH-740L',
                    chatLieu: 3,
                    giaNhap: '60000000',
                    giaBan: '89250000',
                    giamGia: '29',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2Fffa69430-4076-4680-ae30-3e9a4914be68?alt=media&token=dd92c530-c233-408f-97a0-f76dc231a63d',
                    kichThuoc: 'D200-R100',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 1,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Bộ Sofa Da Nỉ 9230',
                    chatLieu: 3,
                    giaNhap: '30000000',
                    giaBan: '42000000',
                    giamGia: '23',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2Fe207ad0d-3c1a-4f37-a82d-641d5dbfecb7?alt=media&token=26ae87b0-a74c-465e-a222-3264a845b059',
                    kichThuoc: 'D200-R100',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 1,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Sofa Giường 215 – 10',
                    chatLieu: 3,
                    giaNhap: '50000000',
                    giaBan: '73500000',
                    giamGia: '28',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2Fae19d665-ce37-434a-860f-3af35f26d6f4?alt=media&token=56d60977-5e69-4acf-b008-a770323484cd',
                    kichThuoc: 'D200-R100',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 1,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Sofa bộ Hugo 8979',
                    chatLieu: 3,
                    giaNhap: '50000000',
                    giaBan: '77000000',
                    giamGia: '30',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2Ff101af1c-0c6b-4876-b51e-bf02f7fec549?alt=media&token=38d84c8d-981d-4197-93af-e94a31a95184',
                    kichThuoc: 'D200-R100',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 1,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

                {
                    tenSp: 'Bàn ghế ăn mã XBA186',
                    chatLieu: 4,
                    giaNhap: '10000000',
                    giaBan: '22000000',
                    giamGia: '30',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F4a75c11c-4a9d-44d0-a066-dcf0066e39b2?alt=media&token=a985d6fd-0e64-4ef1-b004-1dcd7d795173',
                    kichThuoc: 'D180-R80-C75',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 2,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Bàn ghế ăn mã XBA185',
                    chatLieu: 4,
                    giaNhap: '8000000',
                    giaBan: '11000000',
                    giamGia: '25',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F32ab7b2d-b394-4948-a504-f951463f060a?alt=media&token=06228ae4-c18d-4070-a26d-61daa8402fdd',
                    kichThuoc: 'D160-R80-C75',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 2,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Bàn ghế ăn mã XBA188',
                    chatLieu: 4,
                    giaNhap: '30000000',
                    giaBan: '44000000',
                    giamGia: '25',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F8eb23de1-8a43-4514-9e05-45d1a02fe8c8?alt=media&token=4448172f-0b17-41dd-b18e-74f03fadf5a7',
                    kichThuoc: 'D200-R100-C75',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 2,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

                {
                    tenSp: 'Bàn làm việc hòa phát HP120HL3CPO',
                    chatLieu: 4,
                    giaNhap: '5000000',
                    giaBan: '7150000',
                    giamGia: '8',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2Fa9b8d738-4b53-4596-94a1-66d7ed9f4ea7?alt=media&token=e8e2953d-e0f7-48b4-9331-4c3247b5ea88',
                    kichThuoc: 'D180-R60-C75',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 3,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Bàn làm việc',
                    chatLieu: 2,
                    giaNhap: '10000000',
                    giaBan: '15000000',
                    giamGia: '10',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2Fc0c3be3c-d2a6-45be-8fde-5dd4cc015149?alt=media&token=c4a7b587-2316-4616-baf7-50413904ff94',
                    kichThuoc: 'D180-R80-C75',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 3,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Bàn làm việc B2',
                    chatLieu: 4,
                    giaNhap: '5000000',
                    giaBan: '7150000',
                    giamGia: '8',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F52277887-c510-4c56-a80b-c666afc1beb3?alt=media&token=a67962c9-b60c-4f48-9e20-40ac99936a41',
                    kichThuoc: 'D120-R60-C75',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 3,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Bàn làm việc B3',
                    chatLieu: 4,
                    giaNhap: '35000000',
                    giaBan: '50000000',
                    giamGia: '10',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F3610f289-ba12-4994-ab7e-be4645aa7ab4?alt=media&token=9d6e0e98-cac3-4bb0-8ccf-b19c5a2e9b46',
                    kichThuoc: 'D180-R80-C75',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 3,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Bàn làm việc B4',
                    chatLieu: 4,
                    giaNhap: '35000000',
                    giaBan: '50000000',
                    giamGia: '10',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F524d8991-733d-4c9b-9c74-9db831ffee02?alt=media&token=9b3f9c54-58c3-4544-9df4-3c8bae5d4820',
                    kichThuoc: 'D160-R80-C65',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 3,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

                {
                    tenSp: 'Bàn trang điểm',
                    chatLieu: 2,
                    giaNhap: '8000000',
                    giaBan: '12000000',
                    giamGia: '0',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F3c628f70-cba7-4069-a809-a2fc33eca7fb?alt=media&token=b1a38ff8-ef35-4891-a4b3-60993f1ccd8f',
                    kichThuoc: 'D120-R60-C75',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 4,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Bàn trang điểm PU',
                    chatLieu: 2,
                    giaNhap: '8000000',
                    giaBan: '16000000',
                    giamGia: '0',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2Fa1ab5b6e-3962-4fc2-b1f7-a3c2685a976c?alt=media&token=e3290637-aac5-4fe6-a23d-30cee5806a76',
                    kichThuoc: 'D120-R60-C75',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 4,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Giường hoàng gia',
                    chatLieu: 1,
                    giaNhap: '17000000',
                    giaBan: '27000000',
                    giamGia: '0',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2Fdc529585-0c8a-4d39-9361-16c7431fb445?alt=media&token=5f59f334-ba24-4b35-ba68-31eea81402fb',
                    kichThuoc: 'D220-R180',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 4,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Giường PU',
                    chatLieu: 1,
                    giaNhap: '15000000',
                    giaBan: '20000000',
                    giamGia: '0',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2Fb444924f-ce22-4fa5-9c79-59f0a3b324ce?alt=media&token=2172de30-9679-4c75-b8f0-7b63a7b9c865',
                    kichThuoc: 'D220-R180',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 4,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Giường chữ X',
                    chatLieu: 1,
                    giaNhap: '15000000',
                    giaBan: '20000000',
                    giamGia: '0',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F04e31ca8-72d8-4538-be86-cb24cceb218c?alt=media&token=4886ec6c-506f-4936-8819-f7fcc0db61f9',
                    kichThuoc: 'D220-R180',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 4,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Tủ áo 3 buồng',
                    chatLieu: 5,
                    giaNhap: '22000000',
                    giaBan: '28000000',
                    giamGia: '0',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F24f34a53-29b9-4c3d-bf28-17a33a6a5f0f?alt=media&token=5846c3cc-40de-4ca8-b97d-5d577f092a89',
                    kichThuoc: 'D197-R64-C220',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 4,
                    soLuong: 50,
                    trangThai: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    tenSp: 'Tủ áo 4 buồng PU',
                    chatLieu: 1,
                    giaNhap: '25000000',
                    giaBan: '34000000',
                    giamGia: '0',
                    image: 'https://firebasestorage.googleapis.com/v0/b/qlbanhang-457b3.appspot.com/o/Images%2F790bfa2d-d992-468d-9e72-e0ef98d91926?alt=media&token=e9a6e78f-01ad-44dc-9ca1-0abdc82091ef',
                    kichThuoc: 'D197-R64-C220',
                    soLuotDanhGia: 0,
                    tongDanhGia: 0,
                    producttypeId: 4,
                    soLuong: 50,
                    trangThai: 1,
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
