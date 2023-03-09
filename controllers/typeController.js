const { Type } = require("../models/models");

class typeController {
    async create(req, res) {
        const { name } = req.body;
        const type = await Type.create({ name });
        return res.json({ type });
    }
    async getAll(req, res) {
        const type = await Type.findAll();
        return res.json(type)

    }
    async delete(req, res) {
        const { name } = req.body;
        const type = await Type.findOne({ name });
        await type.destroy();
        const type2 = await Type.findAll();
        return res.json(type2);
    }
}

module.exports = new typeController();