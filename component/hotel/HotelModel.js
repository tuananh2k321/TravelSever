
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    id: { type: ObjectId },
    hotelName: { type: String, required: true },
    description: { type: Number, required: true },
    image: { type: String, required: true, default: "https://images.unsplash.com/photo-1693561168758-3929b259af8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI5fGhtZW52UWhVbXhNfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60" },
    rating: { type: Number, required: true },
    address: { type: String, required: true },
    phoneNumber: {type: String, required: true},
    comment: [
        {
          content: { type: String, required: true },
          image: [{ type: String, required: true }],
          timestamp: { type: String, required: true },
          user_id: { type: ObjectId, required: true}
        },
      ],
});

module.exports = mongoose.models.hotel || mongoose.model('hotel', schema);
//trong đây là số ít bên mông là số nhiều
// hotel ---------> hotels
