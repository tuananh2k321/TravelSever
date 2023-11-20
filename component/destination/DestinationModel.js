const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const destinationSchema = new Schema({
  id: { type: ObjectId },
  destinationName: { type: String, required: true },
  content: {
    data: [{
      destinationImage: String,
      description: String,
    }],
  },
  createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.models.destination || mongoose.model("destination", destinationSchema);
//trong đây là số ít bên mông là số nhiều
