const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use('/user', userRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server Started in PORT 3000");
    });
  })
  .catch((err) => {
    console.log("Error in connecting MongoDB");
    console.log(err);
  });
