const uuid = require('uuid') // библиотека создания id
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class deviceController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;

            let fileName = uuid.v4() + '.jpg'; // создание уникального имени файла
            await img.mv(path.resolve(__dirname, '..', 'static', fileName)); //создание файла и запись его в директрорию static
            const device = await Device.create({ name, price, img: fileName, brandId, typeId });
            if (info) {
                info = JSON.parse(info);//преобразуем json строку в объект
                info.forEach(element => {
                    DeviceInfo.create({
                        title: element.title,
                        description: element.description,
                        deviceId: device.id
                    })
                });
            }

            return res.status(200).json(device);
        } catch (error) {
            return next(ApiError.badRequest(error.messages))
        }
    }
    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.body;
        page = page || 1;
        limit = limit || 9; //пагинация
        let offset = page * limit - limit; // отступ

        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset }); //возвращает общее количество объектов
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, typeId, limit, offset } });
        }

        return res.status(200).json(devices)
    }
    async getOne(req, res, next) {

        const { id } = req.params;

        const devices = await Device.findOne({ where: { id }, include: [{ model: DeviceInfo, as: 'info' }] });

        if (devices) {
            return res.status(200).json(devices);
        }
        else return next(ApiError.badRequest('нет данного девайса'))
    }

    async delete(req, res) {

        const { name } = req.body;
        const devices = await Device.findOne({ name });
        await devices.destroy();
        const devices2 = await Device.findAll();
        if (devices2) {
            return res.status(200).json(devices2);
        }
        else return next(ApiError.badRequest('нет данного девайса'))
    }


}

module.exports = new deviceController();