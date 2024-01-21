require("dotenv").config();
const express = require("express");

const db = require("./db");
const createAdmin = require("./create-admin");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
db()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      createAdmin();
    });
  })
  .catch((err) => console.error(err));
