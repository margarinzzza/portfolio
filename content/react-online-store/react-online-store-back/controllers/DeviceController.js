const { Device, DeviceInfo } = require('../models/models.js')

exports.createDevice = async (req, res) => {
    try {
        const { name, price, brandId, typeId, deviceInfo } = req.body
        console.log(deviceInfo)
        const candidate = await Device.findOne({ where: { name: name } })
        let device = {}
        if (!candidate) {
            device = await Device.create({ name, price, brandId, typeId })
            res.json({ msg: 'createDevice success', device })
        } else res.status(400).json({ msg: 'that devicename already exist' })

        deviceInfo.forEach(async (el) => {
            await DeviceInfo.create({
                title: el.property,
                description: el.value,
                deviceId: device.id
            })
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ msg: 'createDevice reject' })
    }
}

exports.getDevices = async (req, res) => {
    try {
        const { nameSearchQuery, typeSearchQuery, brandSearchQuery } = req.body
        let filteredArray = await Device.findAll()
        if (typeSearchQuery !== null) {
            filteredArray = filteredArray.filter(el => el.typeId === typeSearchQuery.id)
        }
        if (brandSearchQuery !== null) {
            filteredArray = filteredArray.filter(el => el.brandId === brandSearchQuery.id)
        }
        if (nameSearchQuery !== '') {
            filteredArray = filteredArray.filter(el => el.name.toLowerCase().includes(nameSearchQuery.toLowerCase()))
        }
        return res.json({ msg: 'getDevices success', filteredArray })

    } catch (e) {
        console.log(e)
        return res.json({ msg: 'getDevices reject' })
    }
}

exports.getDevice = async (req, res) => {
    try {
        const { itemId } = req.body
        const deviceData = await Device.findByPk(itemId)
        const deviceInfoData = await DeviceInfo.findAll({where: {deviceId: itemId}})
        return res.status(200).json({ msg: 'getDevice success', deviceData, deviceInfoData })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ msg: 'getDevices reject' })
    }
}

exports.deleteDevice = async (req, res) => {
    console.log(req.body)
    return res.json({ msg: 'deleteDevice success' })
}