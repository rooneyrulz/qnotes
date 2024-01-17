const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `MongoDB connected at ${connection.host} on port ${connection.port}`.yellow
    );
    return Promise.resolve(connection);
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = connectDB;
