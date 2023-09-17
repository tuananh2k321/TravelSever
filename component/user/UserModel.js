const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  lastName: { type: String, required: true },
  address: {type: String, default: "Ho Chi Minh City"},
  email: { type: String, required: true },
  gender: { type: Boolean, default: true }, //true female false male
  dob: { type: Date, default: Date.now },
  avatar: { type: String, default: "" },
  createAt: { type: Date, default: Date.now },
  role: { type: Number, default: 1 },
  isVerify: { type: Boolean, default:false}
  //1 user
  //100 admin
});

module.exports = mongoose.models.user || mongoose.model("user", userSchema);

