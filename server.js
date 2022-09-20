require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogs");
const userRoutes = require("./routes/user");

// express app
const app = express();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.
 * To implement this, place the following string into the `.env` file
 * MONGODB_URI=mongodb://<user>:<password>@localhost:27017/database_name
 */
const dbString = process.env.MONGODB_URI;
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(dbString, dbOptions)
  .then(() => {
    console.log("connected to database");
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    const db = mongoose.connection;
    //Bind connection to error event (to get notification of connection errors)
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
  });

/**
 * -------------- MIDDLEWARE ----------------
 */

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

/**
 * -------------- ROUTES ----------------
 */

app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);
