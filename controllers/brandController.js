const { Brand } = require("../models/models");

class brandController {
    async create(req, res) {
        const { name } = req.body;
        const brand = await Brand.create({ name });
        return res.json({ brand });
    }
    async getAll(req, res) {
        const brand = await Brand.findAll();
        return res.json(brand)
    }
    async delete(req, res) {
        const { name } = req.body;
        const brand = await Brand.findOne({ name });
        await brand.destroy();
        const brand2 = await Brand.findAll();
        return res.json(brand2);
    }
}


module.exports = new brandController();