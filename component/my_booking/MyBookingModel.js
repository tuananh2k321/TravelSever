const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const myBookingSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String, required: true},
  children: { type: Number, required: true},
  adult: { type: Number, required: true},
  totalPrice: { type: Number},
  bookingDate: { type: String, default: Date.now },
  confirm: {type: Boolean, default: false},
  reason: {type: String, default:""},
  guestInfo: [{
    name: { type: String, default: "abc"},
    birthDate: { type: String, default: Date.now},
    gender: { type: String, default: "abc"},
    type: { type: String, default: 'nguoi lon'}
  }],
  isCancel: {type: Boolean, default: false},
  handleCancel: {type: Boolean, default: false},
  isCompleted: {type: Boolean, default: false},
  expectedDate: {type: String, default: ""},
  departmentDate: {type: String, default:""},
  departmentHour: {type: String, default:""},
  user_id: { type: ObjectId, ref: "user" },
  tour_id: { type: ObjectId, ref: "tour" },
});

module.exports = mongoose.models.mybooking || mongoose.model("mybooking", myBookingSchema);
//trong đây là số ít bên mông là số nhiều
