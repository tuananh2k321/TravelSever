const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const tokenSchema = new Schema({
    id: {type: ObjectId},
    token: {type: String, required: true},
})

module.exports = mongoose.models.tokens || mongoose.model("token", tokenSchema);
