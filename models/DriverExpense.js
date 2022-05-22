const mongoose = require('mongoose');

const driverExpenseSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  url: { type: String, required: true },
  salary: { type: Number, required: true },
  description: { type: String, required: true },
});

const DriverExpense = mongoose.model('DriverExpense', driverExpenseSchema);
module.exports = DriverExpense;
