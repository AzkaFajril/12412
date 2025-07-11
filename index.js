const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// middleware
app.use(cors());
app.use(express.json());

//connect to mongoDB config
mongoose.connect(`mongodb+srv://azka0012:azka0012@cluster0.zkzipyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => console.log('MongoDB connected...'))

  // jwt authentication
  app.post('/jwt', async (req, res) => {
    const user = req.body;
    if (!user || !process.env.ACCESS_TOKEN_SECRET) {
      return res.status(400).json({ error: 'User data or secret missing' });
    }
    try {
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1hr'
      });
      res.send({ token });
    } catch (err) {
      res.status(500).json({ error: 'Failed to generate token', details: err.message });
    }
  });

//   import routes here
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes')
const paymentRoutes = require('./api/routes/paymentRoutes')
const bookingRoutes = require("./api/routes/bookingRoutes");
const timeSettingRoutes = require('./api/routes/timeSettingRoutes');
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);
app.use('/payments', paymentRoutes);
app.use("/bookings", bookingRoutes);
app.use('/api/time-setting', timeSettingRoutes);


//stripe payment route
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "sgd",

    payment_method_types: [
      "card"
    ],

  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});



app.get("/", (req, res) => {
  res.send("Hello Foodi Client Server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
