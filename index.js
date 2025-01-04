const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const app = express();
require('dotenv').config();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json());
console.log("MONGODB_URI:>>>>>>>>>", process.env.MONGODB_URI);

const authRoutes = require("./routes/auth_routs.js");
const orderRoutes = require("./routes/order_routs.js");
const coinPriceRoutes = require("./routes/coinPriceRoutes.js");

app.use("/auth", authRoutes);
app.use("/order", orderRoutes);
app.use("/api", coinPriceRoutes);

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Database connection successfully established");
    app.listen(port, () => {
        console.log("Server started at port no :" + port);
    });
})
.catch((err) => {
    console.error("Database connection error: ", err);
});