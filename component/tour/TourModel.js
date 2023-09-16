const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const tourSchema = new Schema({
  id: { type: ObjectId },
  tourName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  mainImage: { type: String, required: true },
  checking: { type: Array, required: true },
  rating: { type: Number, required: true },
  address: {
    imageMap: { type: String, required: true },
    specificAddress: { type: String, required: true },
  },
  comment: [
    {
      content: { type: String, required: true },
      image:{ type: String, required: true },
      timestamp: { type: String, required: true },
      user_id: { type: ObjectId, required: true },
    },
  ],
  hotel_id: { type: ObjectId, ref: "hotel" },
  domain: { type: String, required: true},
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.models.tour || mongoose.model("tour", tourSchema);
//trong đây là số ít bên mông là số nhiều
