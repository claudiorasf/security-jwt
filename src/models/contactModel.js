const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    firstName: { type: String, required: "Enter a first name" },
    lastName: { type: String, required: "Enter a last name" },
    email: { type: String },
    company: { type: String },
    phone: { type: Number },
    created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Contact", contactSchema);