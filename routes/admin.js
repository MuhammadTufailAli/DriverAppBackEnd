const express = require('express')
const adminController = require('../controllers/adminController')
const adminLogin = adminController.adminLogin
const adminSignUp = adminController.adminSignUp
const adminUpdate = adminController.adminUpdate
const adminRetrive = adminController.adminRetrive
const driverRetriveAll = adminController.driverRetriveAll
const carOwnerRetriveAll = adminController.carOwnerRetriveAll
const carOwnerAction = adminController.carOwnerAction
const driverAction = adminController.driverAction

// Making express router
const router = express.Router()

router.post('/login',adminLogin)
router.post('/signup',adminSignUp)
router.put('/update',adminUpdate)
router.get('/retrive',adminRetrive)
router.get('/retriveDrivers',driverRetriveAll)
router.get('/retriveCarOwners',carOwnerRetriveAll)
router.post('/carOwnerAction',carOwnerAction)
router.post('/driverAction',driverAction)



module.exports = router;
