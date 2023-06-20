const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const tourSchema = new Schema({
  id: { type: ObjectId },
  tourName: { type: String, required: true },
  description: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  address: { type: String, required: true },
  comment: [
    {
      content: { type: String, required: true },
      image: [{ type: String, required: true }],
      timestamp: { type: String, required: true },
      user_id: { type: ObjectId, required: true}
    },
  ],
});

module.exports = mongoose.models.tour || mongoose.model("tour", tourSchema);
//trong đây là số ít bên mông là số nhiều
