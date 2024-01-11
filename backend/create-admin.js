require('colors');

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const colors = require('colors/safe');

const User = require("./models/User");

// Your MongoDB connection string
const mongoURI = "mongodb://localhost:27017/qnotes";

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(colors.green("Connected to MongoDB"));
});

mongoose.connection.on("error", (err) => {
  console.error(colors.red(`MongoDB connection error: ${err}`));
});

// Define your function to create an admin user
async function createAdmin() {
  const username = "admin";
  const hashedPwd = await bcrypt.hash("12345678", 10); // salt rounds

  let user = await User.findOne({ username }).exec();

  if (user && user.roles.includes("Admin")) {
    user.password = hashedPwd;
    user.active = true;
    console.log(colors.green("✅ Admin found! Password was reset"));
  } else {
    user = await User.create({
      username,
      password: hashedPwd,
      roles: ["Admin"],
    });
    console.log(colors.green("✅ New Admin created!"));
  }

  if (user) {
    console.log(colors.cyan("👉 Admin username: " + user.username));
    console.log(colors.cyan("👉 Admin password: " + user.password));
  } else {
    console.error(colors.red("Error: Admin not created!"));
  }
}

// Execute your code
createAdmin()
  .then(() => {
    // Disconnect from MongoDB after the code execution
    mongoose.disconnect((err) => {
      if (err) {
        console.error(colors.red(`Error disconnecting from MongoDB: ${err}`));
      } else {
        console.log(colors.green("Disconnected from MongoDB"));
      }
    });
  })
  .catch((error) => {
    console.error(colors.red("Error during code execution:"), error);
  });