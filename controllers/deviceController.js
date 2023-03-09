const uuid = require ('uuid') // библиотека создания id
const path = require ('path');
const { Device } = require('../models/models');

class deviceController {
    async create(req, res) {
        const { name, price, brandId, typeId } = req.body;
        const { img } = req.files;
        let fileName = uuid.v4 + '.jpg'; // создание уникального имени файла
        img.mv(path.resolve(__dirname,'..', 'static', fileName)); //создание файла и запись его в директрорию static
    const device = await Device.create({name, price, brandId, typeId, fileName})
    
    }
    async getAll(req, res) {

    }
    async getOne(req, res) {

    }

    async delete(req, res) {

    }

}

module.exports = new deviceController();