const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

console.log("MONGODB_URI:", process.env.MONGODB_URI); // Add this line for debugging

const connection = mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Adjust the timeout as needed
    }
  )
  .then(() => {
    console.log("Database connection successfully established");
  })
  .catch((err) => {
    console.error("Database connection error: ", err);
  });

module.exports = connection;
