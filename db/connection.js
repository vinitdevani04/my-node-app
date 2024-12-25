const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connection = mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Adjust the timeout as needed
    }
  )
  .then(() => {
    console.log("Database connection successfully established");
  })
  .catch((err) => {
    console.error("Database connection error: ", err);
  });

module.exports = connection;


// const mongoose = require("mongoose");
// mongoose.set("strictQuery", true);

// const connection = mongoose
//   .connect(
//     "mongodb://localhost:27017/AppleDB",
//     {
//       useNewUrlParser: true, 
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("Database connection successfully established");
//   })
//   .catch((err) => {
//     console.log("Database connection error: ", err);
//   });

// module.exports = connection;

