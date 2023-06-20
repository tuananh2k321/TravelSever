
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const restaurantSchema = new Schema({
    id: { type: ObjectId },
    restaurantName: { type: String, required: true },
    description: { type: Number, required: true },
    listFood: [
        { 
            name : { type: String, required: true},
            detail : { type: String, required: true},
            imageFood : { type: String, required: true},
            priceFood : { type: Number, required: true},
            ratingFood : { type: Number, required: true},
        }
    ],
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

module.exports = mongoose.models.restaurant || mongoose.model('restaurant', restaurantSchema);
//trong đây là số ít bên mông là số nhiều
