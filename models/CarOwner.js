const mongoose = require('mongoose');

const carOwnerSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, unique: true ,required:true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    city:{type: String, required: true},
    email:{type: String, required: true},
    carTitle:{type: String, required: true},
    carModel: String,
    carRegCity: String,
    contactNumber:{type: String, required: true},
    profilePicture: String,
    status: String,
    createdDate: {type: Date, default: new Date()},
    lastModified: Date
});

module.exports = mongoose.model('CarOwner',carOwnerSchema);
