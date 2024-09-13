const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/talktalk")
  .then(() => console.log("connected to DB"));
