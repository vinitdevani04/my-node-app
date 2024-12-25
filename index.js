const express = require('express');
const app = express();
const port = 3000;

require("./db/connection.js");
app.use(express.json());

const authRoutes = require("./routes/auth_routs.js");
const orderRoutes = require("./routes/order_routs.js");


app.use("/auth", authRoutes);
app.use("/order", orderRoutes);


app.listen(port, () => {
    console.log("Server started at port no :" + port);
});
