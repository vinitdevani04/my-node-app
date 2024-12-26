const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

console.log("Connection.js >>>>> >>>> MONGODB_URI:", process.env.MONGODB_URI); // Add this line for debugging

const connection = mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connection successfully established");
  })
  .catch((err) => {
    console.error("Database connection error: ", err);
  });

module.exports = connection;
