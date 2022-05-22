const express = require('express')
var multer = require('multer')

// Making express router
const router = express.Router()
const carOwnerController = require('../controllers/carOwnerController')

const carOwnerLogin = carOwnerController.carOwnerLogin
const carOwnerUpdate = carOwnerController.carOwnerUpdate
const carOwnerRetrive = carOwnerController.carOwnerRetrive
const carOwnerSignup = carOwnerController.carOwnerSingup
const carOwnerRequest = carOwnerController.carOwnerRequest
const viewAllDrivers = carOwnerController.viewAllDrivers
const hiredDriver = carOwnerController.hiredDriver
const driverRequestView = carOwnerController.driverRequestView
const driverAttendanceAction = carOwnerController.driverAttendanceAction
const driverAttendanceHistory = carOwnerController.driverAttendanceHistory
const bookingCancel  = carOwnerController.bookingCancel
const searchFilter  = carOwnerController.searchFilter

// CAR OWNERS PICTURES STORAGE CREATION 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'carOwnersProfiles')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
   
  var upload = multer({ storage: storage })

router.post('/login',carOwnerLogin)
router.post('/createRequest',carOwnerRequest)
router.post('/signup', upload.single('file'),carOwnerSignup)
router.put('/update',upload.single('file'),carOwnerUpdate)
router.get('/retrive',carOwnerRetrive)
router.get('/availableDrivers',viewAllDrivers)
router.get('/hiredDriver',hiredDriver)
router.get('/bookingcancel',bookingCancel)
router.get('/driverAttendanceReqView',driverRequestView)
router.post('/driverAttendanceAction',driverAttendanceAction)
router.get('/driverAttendanceHistory',driverAttendanceHistory)
router.post('/searchFilter',searchFilter)

module.exports = router;
