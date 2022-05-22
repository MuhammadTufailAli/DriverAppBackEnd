const express = require('express');
const Mongoose = require('mongoose');
const path = require('path');
var cors = require('cors');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// importing environment file and configuring it
require('dotenv').config();

const app = express();

const server = express();
const port = process.env.PORT || 3001;

var bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());
const localString = 'mongodb://127.0.0.1:27017/smartDriver';

// Connecting To Data base and Registering Schema
try {
  Mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  require('./models/Admin');
  require('./models/CarOwner');
  require('./models/Driver');
  require('./models/User');
  require('./models/CarOwnerRequest');
  require('./models/DriverAttendanceReq');
  require('./models/DriverExpense');

  console.log('Successfully Connected to Data Base');
} catch (e) {
  console.log('error has occured possible cause:', e);
}

// MiddlWares
server.use(express.static(path.join(__dirname, 'carOwnersProfiles')));
server.use('drivers', express.static(path.join(__dirname, 'driverProfiles')));

//Apis Middlewares
server.use('/admin', require(path.join(__dirname, 'routes/admin.js')));
server.use('/carOwner', require(path.join(__dirname, 'routes/carOwner')));
server.use('/driver', require(path.join(__dirname, 'routes/driver.js')));

server.listen(port, () => {
  console.log('The serve has started listening');
});

server.post('/pay', async (req, res) => {
  console.log('I am in stripe');
  try {
    const { name } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: { name },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ msg: 'Payment Initiated', clientSecret });
  } catch (error) {
    console.log(error);
  }
});

//////////////////////////////// SERVER WORKING STATUS //////////////////////////////

server.get('/', async (req, res) => {
  res.send('SMART DRIVER SERVICE IS RUNNING');
});

//-----------------------------------------------------------------------------------
