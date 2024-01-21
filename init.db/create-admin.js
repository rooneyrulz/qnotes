const bcrypt = require("bcrypt");
const colors = require("colors/safe");
const User = require("./User");

// Define your function to create an admin user
module.exports = async function createAdmin() {
  const username = "admin";
  const password = "12345678";
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

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
    console.log(colors.cyan("👉 Admin password: " + password));
  } else {
    console.error(colors.red("Error: Admin not created!"));
  }
};
