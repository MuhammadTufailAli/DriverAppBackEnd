const express = require('express');
var multer = require('multer');

// Making express router
const router = express.Router();
const Controller = require('../controllers/driverController');

const driverLogin = Controller.driverLogin;
const driverUpdate = Controller.driverUpdate;
const driverRetrive = Controller.driverRetrive;
const driverSignup = Controller.driverSingup;
const requestAction = Controller.requestAction;
const hireBY = Controller.hireBY;
const attendanceRequest = Controller.attendanceRequest;
const driverViewAllReq = Controller.driverViewAllReq;
const driverAttendanceHistory = Controller.driverAttendanceHistory;
const addExpense = Controller.addExpense;
const bookingCancel = Controller.bookingCancel;
const searchFilter = Controller.searchFilter;
const addexpenses = Controller.addexpenses;
const getexpenses = Controller.getexpenses;

// CAR OWNERS PICTURES STORAGE CREATION
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'carOwnersProfiles');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// EXPENSE AND FUEL SLIP PICTURES STORAGE CREATION
var storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'expenses');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });
var upload1 = multer({ storage: storage1 });

router.post('/login', driverLogin);
router.post('/signup', upload.single('file'), driverSignup);
router.put('/update', upload.single('file'), driverUpdate);
router.put(
  '/addExpense',
  upload1.fields([{ name: 'file' }, { name: 'fuelFile' }]),
  addExpense
);

router.get('/retrive', driverRetrive);
router.get('/allRequests', driverViewAllReq);
router.get('/bookingcancel', bookingCancel);
router.post('/requestAction', requestAction);
router.get('/hireBy', hireBY);
router.post('/attendanceRequest', attendanceRequest);
router.get('/driverAttendanceHistory', driverAttendanceHistory);
router.post('/searchFilter', searchFilter);
router.post('/driverexpense', addexpenses);
router.get('/driverexpense', getexpenses);

module.exports = router;
