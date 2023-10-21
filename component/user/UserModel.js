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
  dob: { type: String, default: Date.now },
  avatar: { type: String, default: "https://firebasestorage.googleapis.com/v0/b/travelapp-3e538.appspot.com/o/user-avatar%2Fuser-avatar.png?alt=media&token=ee34d681-f1ed-411c-b2d6-1991fcf7257d" },
  createAt: { type: Date, default: Date.now },
  role: { type: Number, default: 1 }, // 2 is admin, 1 is user
  isVerify: { type: Boolean, default:false}, 
  isBan: { type: Boolean, default:false},
});

module.exports = mongoose.models.user || mongoose.model("user", userSchema);

