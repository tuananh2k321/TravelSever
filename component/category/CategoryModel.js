const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchema = new Schema({
    id: { type: ObjectId },
    categoryName: { type: String, required: true },
    image:{type:String, required: true},
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.models.category || mongoose.model("category", categorySchema);
//trong đây là số ít bên mông là số nhiều
