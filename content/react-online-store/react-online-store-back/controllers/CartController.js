const { Device, Basket, BasketDevice, OrderDevice, Order } = require('../models/models.js')

exports.addToCart = async (req, res) => {
    try {
        const { userId, deviceId } = req.body
        const userCart = await Basket.findOne({ where: { userId } }) 
        const candidate = await BasketDevice.findOne({ where: { basketId: userCart.id, deviceId } })
        if (candidate) {
            const oldCount = candidate.count
            await BasketDevice.update({ count: oldCount + 1 }, { where: { basketId: userCart.id, deviceId } })
            const newDevice = await BasketDevice.findOne({ where: { id: candidate.id } })
            res.json({ msg: 'addToCart success', newDevice, actionType: 'increment' })
        } else {
            const newDevice =  await BasketDevice.create({ basketId: userCart.id, deviceId, count: 1 })
            res.json({ msg: 'addToCart success', newDevice, actionType: 'add' }) 
        }
    } catch (e) {
        console.log(e)
        return res.status(400).json({ msg: 'addToCart reject' })
    }
}

exports.deleteFromCart = async (req, res) => {
    try {
        const { userId, deviceId } = req.body
        const userCart = await Basket.findOne({ where: { userId } }) 
        const candidate = await BasketDevice.findOne({ where: { basketId: userCart.id, deviceId } })
        if (candidate.count > 1) {
            const oldCount = candidate.count
            await BasketDevice.update({ count: oldCount - 1 }, { where: { id: candidate.id } })
            const newDevice = await BasketDevice.findOne({ where: { id: candidate.id } })
            res.json({ msg: 'deleteFromCart success', newDevice, actionType: 'decrement' })
        } else {
            const newDevice = await BasketDevice.findOne({ where: { id: candidate.id } }) 
            await BasketDevice.destroy({ where: { id: candidate.id } })
            res.json({ msg: 'deleteFromCart success', newDevice, actionType: 'destroy' }) 
        }
    } catch (e) {
        console.log(e)
        return res.status(400).json({ msg: 'deleteFromCart reject' })
    }
}

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.body
        const userCart = await Basket.findOne({ where: { userId } })
        const cartData = await BasketDevice.findAll({ where: { basketId: userCart.id } })
        let cartDataFinal = []
        for (let i = 0; i < cartData.length; i++) {
            let item = await Device.findByPk(cartData[i].deviceId)
            cartDataFinal.push({ item, count: cartData[i].count, basketDeviceId: cartData[i].id })
        }
        return res.json({ msg: 'getCart success', cartDataFinal })

    } catch (e) {
        console.log(e)
        return res.json({ msg: 'getCart reject' })
    }
}

exports.makeOrder = async (req, res) => {
    try {
        const { userId, deviceData } = req.body
        const order = await Order.create({ customerId: userId, status: 'created' })
        const userCart = await Basket.findOne({ where: { userId } }) 
        deviceData.forEach(async (el) => {
            await OrderDevice.create({
                deviceId: el.item.id,
                count: el.count,
                orderId: order.id
            })
        })
        await BasketDevice.destroy({ where: { basketId: userCart.id } })
        return res.json({ msg: 'makeOrder success' })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ msg: 'makeOrder reject' })
    }
}

exports.getOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await Order.findAll({ where: { customerId: userId } })
        const orderDeviceData = [] 
        for (let i = 0; i < orders.length; i++) {
            let items = await OrderDevice.findAll({ where: { orderId: orders[i].id } })
            orderDeviceData.push({ items, order: orders[i] })
        }
        let orderDeviceDataFinal = []
        for (let i = 0; i < orderDeviceData.length; i++) {
            let items = []
            for (let j = 0; j < orderDeviceData[i].items.length; j++) {
                let item = await Device.findByPk(orderDeviceData[i].items[j].deviceId)
                items.push({ item, count: orderDeviceData[i].items[j].count })
            }
            orderDeviceDataFinal.push({ items, order: orderDeviceData[i].order })
        }
        return res.json({ msg: 'getOrders success', orderDeviceDataFinal })

    } catch (e) {
        console.log(e)
        return res.json({ msg: 'getOrders reject' })
    }
}

exports.changeOrderStatus = async (req, res) => {
    try {
        const { orderId, value } = req.body
        await Order.update({status: value}, {where: {id: orderId}} ) 
        const order = await Order.findByPk(orderId)
        return res.json({ msg: 'changeOrderStatus success', order })

    } catch (e) {
        console.log(e)
        return res.json({ msg: 'changeOrderStatus reject' })
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll() 
        const orderDeviceData = [] 
        for (let i = 0; i < orders.length; i++) {
            let items = await OrderDevice.findAll({ where: { orderId: orders[i].id } })
            orderDeviceData.push({ items, order: orders[i] })
        }
        let orderDeviceDataFinal = []
        for (let i = 0; i < orderDeviceData.length; i++) {
            let items = []
            for (let j = 0; j < orderDeviceData[i].items.length; j++) {
                let item = await Device.findByPk(orderDeviceData[i].items[j].deviceId)
                items.push({ item, count: orderDeviceData[i].items[j].count })
            }
            orderDeviceDataFinal.push({ items, order: orderDeviceData[i].order })
        }
        return res.json({ msg: 'getOrders success', orderDeviceDataFinal })

    } catch (e) {
        console.log(e)
        return res.json({ msg: 'getAllOrders reject' })
    }
}