
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    id: { type: ObjectId },
    hotelName: { type: String, required: true },
    description: { type: String, required: true },
    // image: { type: String, required: true },
    rating: { type: Number, required: true },
    listImage: { type: Array, required: true },
    address: { type: String, required: true },
    phoneNumber: {type: String, required: true},
    // comment: [
    //     {
    //       content: { type: String, required: true },
    //       image: [{ type: String, required: true }],
    //       timestamp: { type: String, required: true },
    //       user_id: { type: ObjectId, required: true}
    //     },
    //   ],
});

module.exports = mongoose.models.hotel || mongoose.model('hotel', schema);
//trong đây là số ít bên mông là số nhiều
// hotel ---------> hotels
