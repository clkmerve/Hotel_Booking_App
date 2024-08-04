const express = require("express");
const router = express.Router();

//Diğer routes dosyalarını içe aktarma 
 const hotelRoute = require("./hotels.js");
 const roomRoute = require("./rooms.js");
 const cityRoute = require("./cities.js");
 const userRoute = require("./users.js");
 const authRoute = require("./auth.js");
 const paymentRoute = require("./payment.js");
 const reviewRoute = require("./reviews.js");

 router.use("/hotels",hotelRoute);
 router.use("/rooms",roomRoute);
 router.use("/cities",cityRoute);
 router.use("/users", userRoute);
 router.use("/auth",authRoute);
 router.use("/payment",paymentRoute);
 router.use("/reviews",reviewRoute);

module.exports = router;