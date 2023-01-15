const mongoose = require("mongoose");

try {
  mongoose.connect("mongodb://127.0.0.1:27017/bandesal");
  console.log("MongoDB connected");
} catch (error) {
  console.log("Error connecting to DB: " + error);
}
