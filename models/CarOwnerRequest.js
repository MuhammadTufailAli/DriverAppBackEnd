const mongoose = require('mongoose');

const carOwnerRequestSchema = new mongoose.Schema({
    carOwnerUserName: {type: String,required:true},
    driverUserName: {type: String ,required:true},
    carOwnerName: {type: String,required:true},
    jobSpan:  {type: Number, required: true},
    amountOffered: {type: Number, required: true},
    city:{type: String, required: true},
    carTitle:{type: String, required: true},
    carModel: String,
    carRegCity: String,
    profilePicture: String,
    status: String,
    createdDate: {type: Date, default: new Date()},
});

module.exports = mongoose.model('CarOwnerRequest',carOwnerRequestSchema);
