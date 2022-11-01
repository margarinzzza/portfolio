const { Brand, TypeBrand } = require('../models/models.js')

exports.createBrand = async (req, res) => {
    try {
        const data = req.body
        const candidate = await Brand.findOne({ where: { name: data.name } })
        if (!candidate) {
            const brandData = await Brand.create(data)
            return res.json({ msg: 'createBrand success', brandData })
        } else {
            return res.status(400).json({ msg: 'that brandname already exist' })
        }
    } catch (e) {
        console.log(e)
        return res.json({ msg: 'createBrand reject' })
    }
}

exports.getBrands = async (req, res) => {
    try {
        const brandsData = await Brand.findAll()
        return res.json({ msg: 'getBrands success', brandsData })
    } catch (e) {
        console.log(e)
        return res.json({ msg: 'getBrands reject' })
    }
}

exports.deleteBrand = async (req, res) => {
    try {
        const data = req.body
        await Brand.destroy({ where: { id: data.id } })
        return res.json({ msg: 'deleteBrand success' })
    } catch (e) {
        console.log(e)
        return res.json({ msg: 'deleteBrand reject' })
CatalogComponent     } 
}
