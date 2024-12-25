const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connection = mongoose
  .connect(
    "mongodb://localhost:27017/AppleDB",
    {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connection successfully established");
  })
  .catch((err) => {
    console.log("Database connection error: ", err);
  });

module.exports = connection;