const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  
    name: {type: String, required: true},
    userName: {type: String, unique: true ,required:true},
    password: {type: String, required: true},
    email:{type: String, required: true},
    createdDate: {type: Date, default: new Date()},

});

module.exports = mongoose.model('Admin',adminSchema);
