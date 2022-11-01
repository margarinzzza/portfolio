const { Type, TypeBrand } = require('../models/models.js')

exports.createType = async (req, res) => {
    try {
        const data = req.body
        const candidate = await Type.findOne({ where: { name: data.name } })
        if (!candidate) {
            const typeData = await Type.create(data)
            return res.json({ msg: 'createType success', typeData })
        } else {
            return res.status(400).json({ msg: 'that typename already exist' })
        }
    } catch (e) {
        console.log(e)
        return res.json({ msg: 'createType reject' }) 
    }
}

exports.getTypes = async (req, res) => {
    try {
        const typesData = await Type.findAll()
        return res.json({ msg: 'getTypes success', typesData })
    } catch (e) {
        console.log(e)
        return res.json({ msg: 'getTypes reject' })
    }
}

exports.deleteType = async (req, res) => {
    try {
        const data = req.body
        await Type.destroy({ where: { id: data.id } })
        return res.json({ msg: 'deleteType success' })
    } catch (e) {
        console.log(e)
        return res.json({ msg: 'deleteType reject' })
    }
}