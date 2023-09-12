const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const notificationSchema = new Schema({
    id: {type: ObjectId},
    title: {type: String,  required: true},
    content: {type: String, required: true},
    quantity: {type: String, required: true},
    user_id: { type: ObjectId, ref: "user" },
})

module.exports = mongoose.models.notification || mongoose.model("notification", notificationSchema);
//trong đây là số ít bên mông là số nhiều