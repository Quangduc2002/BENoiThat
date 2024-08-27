const db = require('../models/index');

const checkMaterial = async (value) => {
    try {
        let isCheckMaterial = await db.Meterial.findOne({
            where: { tenChatLieu: value },
        });
        if (isCheckMaterial) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
    }
};

class materialController {
    async getMeterial(req, res, next) {
        try {
            let getMeterial = await db.Meterial.findAll();
            res.status(200).json(getMeterial);
        } catch (error) {
            console.log(error);
        }
    }

    async addMeterial(req, res, next) {
        try {
            let isMaterialExist = await checkMaterial(req.body.tenChatLieu);

            if (!isMaterialExist) {
                await db.Meterial.findOne({
                    order: [['ID', 'DESC']],
                    raw: true,
                }).then((latesCourse) => {
                    // id tự tăng
                    req.body.ID = latesCourse.ID + 1;
                    const newMeterial = new db.Meterial(req.body);
                    newMeterial.save();

                    res.status(200).json(newMeterial);
                });
            } else {
                res.status(500).json({ errCode: 1, message: 'Chất liệu đã tồn tại !' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async deleteMeterial(req, res, next) {
        try {
            let deleteMeterial = await db.Meterial.destroy({
                where: { ID: req.params.id },
            });
            res.status(200).json(deleteMeterial);
        } catch (error) {
            console.log(error);
        }
    }

    // [PUT] /:id/update
    async updateMeterial(req, res) {
        try {
            let isMaterialExist = await checkMaterial(req.body.tenChatLieu);

            if (!isMaterialExist) {
                const updateMeterial = await db.Meterial.update(req.body, {
                    where: { ID: req.params.id },
                    raw: true,
                });
                res.status(200).json(updateMeterial);
            } else {
                res.status(500).json({ errCode: 1, message: 'Chất liệu đã tồn tại !' });
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new materialController();
