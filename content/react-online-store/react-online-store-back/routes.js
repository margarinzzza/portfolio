const express = require("express")
const AuthController = require("./controllers/AuthController.js")
const DeviceController = require("./controllers/DeviceController.js")
const TypeController = require("./controllers/TypeController.js")
const BrandController = require("./controllers/BrandController.js")
const authMiddleware = require("./authMiddleware.js")
const router = express.Router();

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/auth', authMiddleware)
router.post('/delete_profile', AuthController.deleteProfile)

router.post('/create_device', DeviceController.createDevice)
router.post('/get_devices', DeviceController.getDevices)
router.post('/get_device', DeviceController.getDevice)
router.delete('/delete_device', DeviceController.deleteDevice)
 
router.post('/create_type', TypeController.createType) 
router.get('/get_types', TypeController.getTypes)
router.delete('/delete_type', TypeController.deleteType)

router.post('/create_brand', BrandController.createBrand)
router.get('/get_brands', BrandController.getBrands)
router.delete('/delete_brand', BrandController.deleteBrand)

module.exports = router;