const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var currentdate = new Date();
var datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

const userSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    lastName: { type: String, required: true },
    address: {
        country: { type: String, default: "Viet Nam" },
        city: { type: String, default: "Ho Chi Minh City" },
        address: { type: String, default: "" },
    },
    email: { type: String, required: true },
    gender: { type: Boolean, default: true },//true female false male
    dob: { type: Date, default: Date.now },
    avatar: { type: String ,default: ""},
    createAt: { type: Date, default: Date.now },
    role: { type: Number, default: 1 },
    //1 user
    //100 admin

});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
//trong đây là số ít bên mông là số nhiều