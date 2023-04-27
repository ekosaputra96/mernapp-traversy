const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
    age: {
        type: Number,
        defaultValue: null,
    },
    address: {
        type: String,
        defaultValue: null,
    },
});

module.exports = mongoose.model("User", userSchema);
