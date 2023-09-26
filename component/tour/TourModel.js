const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const tourSchema = new Schema({
  id: { type: ObjectId },
  tourName: { type: String },
  description: { type: String},
  price: { type: Number },
  mainImage: { type: Array},
  checking: { type: Array},
  rating: { type: Number },
  address: { type: String },
  comment: [
    {
      content: { type: String },
      image:{ type: String },
      timestamp: { type: String },
      user_id: { type: ObjectId},
    },
  ],
  hotel_id: { type: ObjectId, ref: "hotel" },
  destination_id: { type: Array, ref: "destination" },
  domain: { type: String},
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.models.tour || mongoose.model("tour", tourSchema);
//trong đây là số ít bên mông là số nhiều
