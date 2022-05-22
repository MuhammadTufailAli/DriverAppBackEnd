const mongoose = require('mongoose');

const driverAttendance = new mongoose.Schema({
    reqId: String,
    carOwnerUserName: {type: String,required:true},
    driverUserName: {type: String ,required:true},
    status:{type: String},
    fuelExpense: {type: Number, required: true},
    maintenanceExpense:{type: Number, required: true},
    fuleSlip: String,
    maintenanceSlip: String,
    createdDate: {type: Date, default: new Date()},
});

module.exports = mongoose.model('DriverAttendance',driverAttendance);
