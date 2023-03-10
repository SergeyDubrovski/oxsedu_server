const uuid = require('uuid') // библиотека создания id
const path = require('path');
const { Device } = require('../models/models');
const ApiError = require('../error/ApiError');

class deviceController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId } = req.body;
            const { img } = req.files;

            let fileName = uuid.v4() + '.jpg'; // создание уникального имени файла
            await img.mv(path.resolve(__dirname, '..', 'static', fileName)); //создание файла и запись его в директрорию static
            const device = await Device.create({ name, price, img: fileName, brandId, typeId })

            return res.status(200).json(device);
        } catch (error) {
            return next(ApiError.badRequest(error.messages))
        }


    }
    async getAll(req, res) {
        const devices = await Device.findAll();
        return res.status(200).json(devices)
    }
    async getOne(req, res) {
        console.log(req.params);
       const { id } = req.params;
       console.log(id);
      const devices = await Device.findOne({ id });
        res.status(200).json(devices)
    }

    async delete(req, res) {
        const { name } = req.body;
        const devices = await Device.findOne({ name });
        await devices.destroy();
        const devices2 = await Device.findAll();
        return res.status(200).json(devices2);
    }
    }



module.exports = new deviceController();